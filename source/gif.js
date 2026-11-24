// Lecture d'un GIF animé dans une texture 3D
import * as THREE from 'three';
import { parseGIF, decompressFrames } from 'gifuct-js';

export async function chargerGif(url) {
  const rep = await fetch(url);
  if (!rep.ok) throw new Error('GIF introuvable : ' + url);
  const gif = parseGIF(await rep.arrayBuffer());
  const images = decompressFrames(gif, true);
  if (!images.length) throw new Error('GIF vide');

  const W = gif.lsd.width, H = gif.lsd.height;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const g = canvas.getContext('2d');
  const tmp = document.createElement('canvas');
  const tg = tmp.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  let i = 0, attente = 0, precedente = null;
  function dessiner(f) {
    if (precedente && precedente.disposalType === 2) {
      const d = precedente.dims; g.clearRect(d.left, d.top, d.width, d.height);
    }
    const d = f.dims;
    tmp.width = d.width; tmp.height = d.height;
    const img = tg.createImageData(d.width, d.height);
    img.data.set(f.patch);
    tg.putImageData(img, 0, 0);
    g.drawImage(tmp, d.left, d.top);
    precedente = f;
    texture.needsUpdate = true;
  }
  dessiner(images[0]);

  return {
    texture,
    ratio: W / H,
    avancer(dtMs) {
      attente += dtMs;
      const delai = Math.max(images[i].delay || 100, 20);
      if (attente < delai) return;
      attente = 0;
      i = (i + 1) % images.length;
      if (i === 0) { g.clearRect(0, 0, W, H); precedente = null; }
      dessiner(images[i]);
    }
  };
}
