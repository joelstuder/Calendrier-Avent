// Chargement des textures photo et des objets 3D (Poly Haven, CC0) d'une salle
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const cacheTex = new Map();
const cacheModeles = new Map();
const chargeurTex = new THREE.TextureLoader();
const chargeurGltf = new GLTFLoader();

function texture(url, couleur) {
  if (!cacheTex.has(url)) {
    cacheTex.set(url, new Promise((ok) => {
      chargeurTex.load(url, (t) => {
        t.colorSpace = couleur ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = 4;
        ok(t);
      }, undefined, () => ok(null));
    }));
  }
  return cacheTex.get(url);
}

function modele(url) {
  if (!cacheModeles.has(url)) {
    cacheModeles.set(url, new Promise((ok) => {
      chargeurGltf.load(url, (g) => ok(g.scene), undefined, () => ok(null));
    }));
  }
  return cacheModeles.get(url);
}

// ressources = { textures: ['mur', 'sol', …], modeles: { bouclier: 'modeles/kite_shield/modele.gltf' } }
export async function chargerRessources(ressources, progres) {
  const taches = [];
  const tex = {}, mod = {};
  let fait = 0;
  const compter = () => progres?.(++fait / taches.length);
  for (const nom of ressources.textures || []) {
    taches.push(texture(`textures/${nom}.jpg`, true).then((t) => { tex[nom] = t; compter(); }));
    taches.push(texture(`textures/${nom}-normal.jpg`, false).then((t) => { tex[nom + '-normal'] = t; compter(); }));
  }
  for (const [nom, url] of Object.entries(ressources.modeles || {})) {
    taches.push(modele(url).then((m) => { mod[nom] = m; compter(); }));
  }
  await Promise.all(taches);

  return {
    // matériau photo-réaliste, répété selon la taille réelle de la surface (en mètres)
    materiau(nom, rx = 1, ry = 1, options = {}) {
      const { relief = 1, ...opts } = options;
      const base = tex[nom], nrm = tex[nom + '-normal'];
      const m = new THREE.MeshStandardMaterial({ roughness: 0.9, ...opts });
      if (base) { m.map = base.clone(); m.map.repeat.set(rx, ry); m.map.needsUpdate = true; }
      if (nrm) { m.normalMap = nrm.clone(); m.normalMap.repeat.set(rx, ry); m.normalMap.needsUpdate = true; m.normalScale.set(relief, relief); }
      return m;
    },
    // copie d'un objet 3D, mise à la hauteur voulue et posée au sol (y = 0)
    modele(nom, hauteur) {
      const src = mod[nom];
      if (!src) return null;
      const o = src.clone(true);
      const b = new THREE.Box3().setFromObject(o);
      const h = b.max.y - b.min.y || 1;
      const k = hauteur / h;
      o.scale.setScalar(k);
      o.position.y = -b.min.y * k;
      const g = new THREE.Group(); g.add(o);
      return g;
    }
  };
}
