// Textures procédurales dessinées sur canvas (aucune image externe)
import * as THREE from 'three';

export const POLICE_TITRE = '"Uncial Antiqua", "Cormorant Garamond", Georgia, serif';
export const POLICE_TEXTE = '"Cormorant Garamond", Georgia, serif';

// Générateur pseudo-aléatoire stable (mêmes murs à chaque visite)
export function rng(seed = 7) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function toile(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}

function versTexture(c, { repeat = [1, 1], srgb = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat[0] !== 1 || repeat[1] !== 1) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  t.anisotropy = 4;
  return t;
}

function grain(g, w, h, r, n = 4000, alpha = 0.06) {
  for (let i = 0; i < n; i++) {
    const v = r() < 0.5 ? 0 : 255;
    g.fillStyle = `rgba(${v},${v},${v},${alpha * r()})`;
    g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
  }
}

function teinte(base, r, amp) {
  const k = (r() - 0.5) * amp;
  return `rgb(${base.map(v => Math.max(0, Math.min(255, Math.round(v + k)))).join(',')})`;
}

// Mur de pierres de taille, chaud et patiné
export function pierreMur(seed = 3) {
  const r = rng(seed), W = 512, H = 512;
  const [c, g] = toile(W, H);
  g.fillStyle = '#3a332b'; g.fillRect(0, 0, W, H);
  const rangs = [72, 56, 80, 64, 72, 56, 64, 48];       // assises irrégulières, total 512
  let y = 0;
  rangs.forEach((rangH, ri) => {
    let x = -r() * 120;
    while (x < W) {
      const w = 110 + r() * 150;
      const base = teinte([128, 119, 104], r, 34);
      const dessine = (ox) => {
        g.fillStyle = base;
        g.beginPath(); g.roundRect(ox + 3, y + 3, w - 6, rangH - 6, 7); g.fill();
        g.fillStyle = 'rgba(255,245,225,0.08)'; g.fillRect(ox + 6, y + 4, w - 12, 4);
        g.fillStyle = 'rgba(0,0,0,0.22)'; g.fillRect(ox + 6, y + rangH - 9, w - 12, 5);
      };
      dessine(x);
      if (x + w > W) dessine(x - W);
      if (x < 0) dessine(x + W);
      for (let k = 0; k < 9; k++) {
        g.fillStyle = `rgba(${r() < .55 ? '35,30,25' : '210,200,180'},${0.04 + r() * 0.08})`;
        g.beginPath(); g.ellipse(((x + r() * w) % W + W) % W, y + 6 + r() * (rangH - 12), 3 + r() * 14, 2 + r() * 6, r() * 3, 0, 7); g.fill();
      }
      x += w;
    }
    y += rangH;
  });
  grain(g, W, H, r, 14000, 0.09);
  return versTexture(c, { repeat: [1, 1] });
}

// Dallage de sol
export function dalles(seed = 11) {
  const r = rng(seed), W = 512, H = 512;
  const [c, g] = toile(W, H);
  g.fillStyle = '#2e2620'; g.fillRect(0, 0, W, H);
  const n = 4, s = W / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    g.fillStyle = teinte([118, 102, 84], r, 36);
    const m = 4;
    g.fillRect(i * s + m, j * s + m, s - 2 * m, s - 2 * m);
    g.fillStyle = 'rgba(0,0,0,0.12)';
    g.fillRect(i * s + m, j * s + s - m - 8, s - 2 * m, 8);
    for (let k = 0; k < 10; k++) {
      g.fillStyle = `rgba(30,20,10,${0.04 + r() * 0.07})`;
      g.beginPath(); g.ellipse(i * s + r() * s, j * s + r() * s, 6 + r() * 22, 4 + r() * 12, r() * 3, 0, 7); g.fill();
    }
  }
  grain(g, W, H, r, 12000, 0.07);
  return versTexture(c);
}

// Bois en planches
export function bois(base = [92, 58, 32], seed = 5, horizontal = true) {
  const r = rng(seed), W = 256, H = 256;
  const [c, g] = toile(W, H);
  const n = 4, s = H / n;
  for (let i = 0; i < n; i++) {
    g.fillStyle = teinte(base, r, 26);
    if (horizontal) g.fillRect(0, i * s, W, s); else g.fillRect(i * s, 0, s, H);
    for (let k = 0; k < 40; k++) {
      g.strokeStyle = `rgba(20,10,0,${0.05 + r() * 0.12})`;
      g.lineWidth = 0.5 + r() * 1.5;
      g.beginPath();
      if (horizontal) { const y = i * s + r() * s; g.moveTo(0, y); g.bezierCurveTo(W * .3, y + (r() - .5) * 8, W * .7, y + (r() - .5) * 8, W, y); }
      else { const x = i * s + r() * s; g.moveTo(x, 0); g.bezierCurveTo(x + (r() - .5) * 8, H * .3, x + (r() - .5) * 8, H * .7, x, H); }
      g.stroke();
    }
    g.fillStyle = 'rgba(0,0,0,0.35)';
    if (horizontal) g.fillRect(0, i * s, W, 2); else g.fillRect(i * s, 0, 2, H);
  }
  return versTexture(c);
}

// Plateau de la Table ronde : cernes, marqueterie et filet doré
export function plateauTable() {
  const r = rng(21), S = 1024;
  const [c, g] = toile(S, S);
  const cx = S / 2;
  const grd = g.createRadialGradient(cx, cx, 10, cx, cx, cx);
  grd.addColorStop(0, '#7b4a26'); grd.addColorStop(1, '#5a3218');
  g.fillStyle = grd; g.fillRect(0, 0, S, S);
  // quartiers de bois
  for (let k = 0; k < 16; k++) {
    const a0 = (k / 16) * Math.PI * 2;
    g.fillStyle = k % 2 ? 'rgba(255,220,170,0.05)' : 'rgba(0,0,0,0.06)';
    g.beginPath(); g.moveTo(cx, cx); g.arc(cx, cx, cx * 0.86, a0, a0 + Math.PI / 8); g.closePath(); g.fill();
  }
  for (let k = 0; k < 140; k++) {
    g.strokeStyle = `rgba(30,12,0,${0.04 + r() * 0.08})`;
    g.lineWidth = 0.6 + r() * 1.4;
    g.beginPath(); g.arc(cx, cx, r() * cx * 0.98, 0, 7); g.stroke();
  }
  const filet = (rad, w, col) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(cx, cx, rad, 0, 7); g.stroke(); };
  filet(cx * 0.88, 10, '#c89b3c'); filet(cx * 0.88, 2, '#f3d27a');
  filet(cx * 0.30, 6, '#c89b3c');
  filet(cx * 0.97, 14, '#3a1e0c');
  // étoile centrale
  g.fillStyle = 'rgba(200,155,60,0.55)';
  g.beginPath();
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2, rr = k % 2 ? cx * 0.12 : cx * 0.27;
    g.lineTo(cx + Math.cos(a) * rr, cx + Math.sin(a) * rr);
  }
  g.closePath(); g.fill();
  grain(g, S, S, r, 20000, 0.05);
  return versTexture(c);
}

// Bannière : rouge profond, bordure dorée, emblème original (couronne et épée)
export function banniere(variante = 0) {
  const W = 256, H = 640;
  const [c, g] = toile(W, H);
  const fonds = ['#7a1418', '#1d2f5c', '#7a1418'];
  g.fillStyle = fonds[variante % fonds.length];
  g.beginPath(); g.moveTo(0, 0); g.lineTo(W, 0); g.lineTo(W, H - 70); g.lineTo(W / 2, H); g.lineTo(0, H - 70); g.closePath(); g.fill();
  // plis
  for (let x = 0; x < W; x += 32) {
    const gr = g.createLinearGradient(x, 0, x + 32, 0);
    gr.addColorStop(0, 'rgba(0,0,0,0.22)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.06)'); gr.addColorStop(1, 'rgba(0,0,0,0.22)');
    g.fillStyle = gr; g.fillRect(x, 0, 32, H);
  }
  g.strokeStyle = '#d4a845'; g.lineWidth = 10;
  g.beginPath(); g.moveTo(14, 0); g.lineTo(14, H - 76); g.lineTo(W / 2, H - 14); g.lineTo(W - 14, H - 76); g.lineTo(W - 14, 0); g.stroke();
  // couronne
  g.fillStyle = '#e2b74e';
  const cy = 230;
  g.beginPath();
  g.moveTo(60, cy + 40); g.lineTo(60, cy - 10); g.lineTo(90, cy + 15); g.lineTo(W / 2, cy - 35);
  g.lineTo(W - 90, cy + 15); g.lineTo(W - 60, cy - 10); g.lineTo(W - 60, cy + 40); g.closePath(); g.fill();
  g.fillRect(56, cy + 40, W - 112, 16);
  // épée verticale
  g.fillRect(W / 2 - 6, cy + 80, 12, 230);
  g.fillRect(W / 2 - 50, cy + 100, 100, 12);
  g.beginPath(); g.arc(W / 2, cy + 80, 12, 0, 7); g.fill();
  g.beginPath(); g.moveTo(W / 2 - 6, cy + 310); g.lineTo(W / 2, cy + 340); g.lineTo(W / 2 + 6, cy + 310); g.fill();
  const t = versTexture(c);
  return t;
}

// Écu du jour : partitions héraldiques variées et grand numéro
const EMAUX = [
  ['#8c1a1a', '#d4a845'], ['#1d3a78', '#e8e1cf'], ['#1f5a32', '#d4a845'], ['#20201f', '#d4a845'],
  ['#8c1a1a', '#e8e1cf'], ['#1d3a78', '#d4a845'], ['#5b2a6e', '#e8e1cf']
];
export function faceEcu(jour) {
  const W = 512, H = 614;
  const [c, g] = toile(W, H);
  const [a, b] = EMAUX[jour % EMAUX.length];
  g.fillStyle = a; g.fillRect(0, 0, W, H);
  g.fillStyle = b;
  const p = jour % 5;
  if (p === 0) { g.fillRect(W / 2, 0, W / 2, H); }                                  // parti
  else if (p === 1) { g.beginPath(); g.moveTo(0, H * .78); g.lineTo(W / 2, H * .38); g.lineTo(W, H * .78); g.lineTo(W, H * .95); g.lineTo(W / 2, H * .55); g.lineTo(0, H * .95); g.fill(); } // chevron
  else if (p === 2) { g.beginPath(); g.moveTo(0, 0); g.lineTo(W * .28, 0); g.lineTo(W, H * .7); g.lineTo(W, H); g.lineTo(W * .72, H); g.lineTo(0, H * .3); g.fill(); } // bande
  else if (p === 3) { g.fillRect(0, 0, W, H * .28); }                               // chef
  else { g.fillRect(W * .4, 0, W * .2, H); g.fillRect(0, H * .3, W, H * .17); }     // croix
  // médaillon pour la lisibilité du numéro
  g.fillStyle = 'rgba(15,10,5,0.55)';
  g.beginPath(); g.arc(W / 2, H * .47, 150, 0, 7); g.fill();
  g.strokeStyle = '#d4a845'; g.lineWidth = 8; g.stroke();
  g.fillStyle = '#f6e7c1';
  g.font = `200px ${POLICE_TITRE}`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 12;
  g.fillText(String(jour), W / 2, H * .49);
  const t = versTexture(c);
  t.repeat.set(1 / 1.0, 1 / 1.2);
  t.offset.set(0.5, 0.65 / 1.2);
  return t;
}

// Parchemin avec texte (plaques, répliques de décor, cadres sans GIF)
export function parchemin(lignes, { W = 512, H = 256, taille = 38, titre = '', sceau = false } = {}) {
  const r = rng(lignes.join('').length + 3);
  const [c, g] = toile(W, H);
  const gr = g.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W * .7);
  gr.addColorStop(0, '#efe0bd'); gr.addColorStop(1, '#c9ab76');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  grain(g, W, H, r, 5000, 0.08);
  g.strokeStyle = 'rgba(90,55,20,0.55)'; g.lineWidth = 3;
  g.strokeRect(12, 12, W - 24, H - 24);
  g.fillStyle = '#3b2410';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  let y0 = H / 2;
  if (titre) {
    g.font = `${Math.round(taille * .7)}px ${POLICE_TITRE}`;
    g.fillStyle = '#7a1418';
    g.fillText(titre, W / 2, 46);
    g.fillStyle = '#3b2410';
    y0 = H / 2 + 18;
  }
  // retour à la ligne automatique
  g.font = `italic ${taille}px ${POLICE_TEXTE}`;
  const lignesFinales = [];
  for (const l of lignes) {
    const mots = l.split(' ');
    let cur = '';
    for (const m of mots) {
      const test = cur ? cur + ' ' + m : m;
      if (g.measureText(test).width > W - 70 && cur) { lignesFinales.push(cur); cur = m; } else cur = test;
    }
    if (cur) lignesFinales.push(cur);
  }
  let t = taille;
  while (lignesFinales.length * t * 1.15 > H - (titre ? 110 : 60) && t > 16) t -= 2;
  g.font = `italic ${t}px ${POLICE_TEXTE}`;
  const total = lignesFinales.length * t * 1.15;
  lignesFinales.forEach((l, i) => {
    const derniere = i === lignesFinales.length - 1 && l.startsWith('—');
    g.font = derniere ? `${Math.round(t * .8)}px ${POLICE_TEXTE}` : `italic ${t}px ${POLICE_TEXTE}`;
    g.fillText(l, W / 2, y0 - total / 2 + t * 0.58 + i * t * 1.15);
  });
  if (sceau) {
    g.fillStyle = '#8c1a1a';
    g.beginPath(); g.arc(W - 60, H - 56, 30, 0, 7); g.fill();
    g.fillStyle = '#b8322c'; g.beginPath(); g.arc(W - 63, H - 59, 21, 0, 7); g.fill();
  }
  return versTexture(c);
}

// Drap de velours qui couvre un cadre tant que la case n'est pas révélée
export function drape(jour) {
  const W = 512, H = 368;
  const [c, g] = toile(W, H);
  g.fillStyle = '#5c0f14'; g.fillRect(0, 0, W, H);
  for (let x = 0; x < W; x += 40) {
    const gr = g.createLinearGradient(x, 0, x + 40, 0);
    gr.addColorStop(0, 'rgba(0,0,0,0.35)'); gr.addColorStop(.5, 'rgba(255,200,200,0.10)'); gr.addColorStop(1, 'rgba(0,0,0,0.35)');
    g.fillStyle = gr; g.fillRect(x, 0, 40, H);
  }
  g.fillStyle = 'rgba(212,168,69,0.9)';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `46px ${POLICE_TITRE}`;
  g.fillText(`${jour} décembre`, W / 2, H / 2);
  return versTexture(c);
}

// Fenêtre de nuit d'hiver : vitraux en losanges, lune, flocons
export function fenetre(seed = 2) {
  const r = rng(seed), W = 256, H = 512;
  const [c, g] = toile(W, H);
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#0c1630'); gr.addColorStop(1, '#2b4a78');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(230,240,255,0.9)';
  for (let i = 0; i < 70; i++) { g.beginPath(); g.arc(r() * W, r() * H, 0.8 + r() * 2.4, 0, 7); g.fill(); }
  g.strokeStyle = 'rgba(20,20,25,0.85)'; g.lineWidth = 4;
  for (let k = -H; k < W + H; k += 46) {
    g.beginPath(); g.moveTo(k, 0); g.lineTo(k + H, H); g.stroke();
    g.beginPath(); g.moveTo(k, H); g.lineTo(k + H, 0); g.stroke();
  }
  return versTexture(c);
}

// Porte en planches verticales, pentures de fer
export function porte() {
  const r = rng(9), W = 256, H = 512;
  const [c, g] = toile(W, H);
  const n = 5, s = W / n;
  for (let i = 0; i < n; i++) {
    g.fillStyle = teinte([84, 52, 28], r, 22);
    g.fillRect(i * s, 0, s, H);
    for (let k = 0; k < 30; k++) {
      g.strokeStyle = `rgba(20,10,0,${0.06 + r() * 0.12})`;
      g.beginPath(); const x = i * s + r() * s; g.moveTo(x, 0); g.lineTo(x + (r() - .5) * 6, H); g.stroke();
    }
    g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(i * s, 0, 3, H);
  }
  g.fillStyle = '#2a2622';
  for (const y of [90, 300, 440]) {
    g.fillRect(0, y, W, 20);
    for (let x = 14; x < W; x += 34) { g.fillStyle = '#4a4540'; g.beginPath(); g.arc(x, y + 10, 5, 0, 7); g.fill(); g.fillStyle = '#2a2622'; }
  }
  return versTexture(c);
}

// Halo lumineux pour les flammes
export function halo() {
  const S = 128;
  const [c, g] = toile(S, S);
  const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,240,200,1)');
  gr.addColorStop(0.25, 'rgba(255,180,80,0.8)');
  gr.addColorStop(1, 'rgba(255,120,20,0)');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  return versTexture(c);
}

// Volets d'une case : deux battants peints aux couleurs du jour, numéro à cheval sur les deux
export function volets(jour) {
  const r = rng(jour * 13 + 1), W = 512, H = 376;
  const [c, g] = toile(W, H);
  const [fond, metal] = EMAUX[jour % EMAUX.length];
  for (let k = 0; k < 8; k++) {                       // planches verticales
    g.fillStyle = fond; g.fillRect(k * 64, 0, 64, H);
    g.fillStyle = `rgba(${r() < .5 ? '0,0,0' : '255,240,220'},${0.05 + r() * 0.08})`; g.fillRect(k * 64, 0, 64, H);
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(k * 64, 0, 3, H);
    for (let n = 0; n < 14; n++) {
      g.strokeStyle = `rgba(0,0,0,${0.05 + r() * 0.1})`; g.lineWidth = 1;
      g.beginPath(); const x = k * 64 + r() * 64; g.moveTo(x, 0); g.lineTo(x + (r() - .5) * 4, H); g.stroke();
    }
  }
  grain(g, W, H, r, 5000, 0.08);
  for (const x0 of [0, W / 2]) {                      // cadre doré de chaque battant
    g.strokeStyle = metal; g.lineWidth = 12; g.strokeRect(x0 + 14, 14, W / 2 - 28, H - 28);
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 2; g.strokeRect(x0 + 22, 22, W / 2 - 44, H - 44);
  }
  g.fillStyle = '#2a2622';                            // pentures
  for (const y of [70, H - 84]) { g.fillRect(0, y, 120, 14); g.fillRect(W - 120, y, 120, 14); }
  g.fillStyle = 'rgba(15,10,5,0.6)';                  // médaillon central
  g.beginPath(); g.arc(W / 2, H / 2, 112, 0, 7); g.fill();
  g.strokeStyle = '#d4a845'; g.lineWidth = 8; g.stroke();
  g.fillStyle = '#f6e7c1'; g.font = `150px ${POLICE_TITRE}`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 10;
  g.fillText(String(jour), W / 2, H / 2 + 6);
  return versTexture(c);
}

// Intérieur lumineux d'une case, vu pendant l'ouverture des volets
export function lueur() {
  const W = 512, H = 376;
  const [c, g] = toile(W, H);
  const gr = g.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W * .62);
  gr.addColorStop(0, '#fff3cf'); gr.addColorStop(0.35, '#ffc867'); gr.addColorStop(1, '#6b2a0c');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const r = rng(77);
  for (let i = 0; i < 60; i++) {
    g.fillStyle = `rgba(255,255,240,${0.3 + r() * 0.6})`;
    g.beginPath(); g.arc(r() * W, r() * H, 0.8 + r() * 2.2, 0, 7); g.fill();
  }
  return versTexture(c);
}

// Vitrail : losanges rouges, jaunes et bleus sertis de plomb
export function vitrail() {
  const W = 256, H = 512;
  const [c, g] = toile(W, H);
  g.fillStyle = '#f2e3b0'; g.fillRect(0, 0, W, H);
  const couleurs = ['#b3221d', '#e2a93a', '#1d3f8a', '#b3221d', '#f4e7c0'];
  const s = 64;
  for (let j = -1; j < H / (s / 2) + 1; j++) for (let i = -1; i < W / s + 1; i++) {
    const cx = i * s + (j % 2 ? s / 2 : 0), cy = j * s / 2;
    g.fillStyle = couleurs[(i * 3 + j * 7 + 50) % couleurs.length];
    g.beginPath(); g.moveTo(cx, cy - s / 2); g.lineTo(cx + s / 2, cy); g.lineTo(cx, cy + s / 2); g.lineTo(cx - s / 2, cy); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.18)';
    g.beginPath(); g.moveTo(cx, cy - s / 4); g.lineTo(cx + s / 4, cy); g.lineTo(cx, cy + s / 4); g.lineTo(cx - s / 4, cy); g.closePath(); g.fill();
  }
  g.strokeStyle = '#1c1a18'; g.lineWidth = 5;
  for (let k = -H; k < W + H; k += s) {
    g.beginPath(); g.moveTo(k, 0); g.lineTo(k + H, H); g.stroke();
    g.beginPath(); g.moveTo(k, H); g.lineTo(k + H, 0); g.stroke();
  }
  g.lineWidth = 14; g.strokeRect(0, 0, W, H);
  return versTexture(c);
}

// Pages du livre posé sur le pupitre
export function pagesLivre() {
  const r = rng(5), W = 512, H = 352;
  const [c, g] = toile(W, H);
  const gr = g.createLinearGradient(0, 0, W, 0);
  gr.addColorStop(0, '#d9c393'); gr.addColorStop(0.47, '#efe2bf'); gr.addColorStop(0.5, '#b59a68'); gr.addColorStop(0.53, '#efe2bf'); gr.addColorStop(1, '#d9c393');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  grain(g, W, H, r, 3000, 0.06);
  g.fillStyle = '#7a1418'; g.font = `44px ${POLICE_TITRE}`; g.textAlign = 'center';
  g.fillText('Bienvenue', W * 0.25, 70);
  g.fillStyle = 'rgba(59,36,16,0.75)';
  for (const x0 of [30, W / 2 + 26]) {
    for (let y = x0 < 100 ? 110 : 50; y < H - 30; y += 22) {
      let x = x0;
      while (x < x0 + W / 2 - 70) { const w = 12 + r() * 40; g.fillRect(x, y, w, 4); x += w + 8; }
    }
  }
  return versTexture(c);
}

// Ce qu'on aperçoit derrière la porte ouverte : un passage baigné de lumière chaude et de brume
export function passage() {
  const W = 256, H = 512;
  const [c, g] = toile(W, H);
  g.fillStyle = '#0c0705'; g.fillRect(0, 0, W, H);
  const gr = g.createRadialGradient(W / 2, H * 0.62, 10, W / 2, H * 0.62, H * 0.6);
  gr.addColorStop(0, 'rgba(255,236,190,1)'); gr.addColorStop(0.25, 'rgba(255,190,110,0.85)'); gr.addColorStop(0.7, 'rgba(120,60,20,0.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const r = rng(31);
  for (let i = 0; i < 18; i++) {                       // volutes de brume
    g.fillStyle = `rgba(255,230,200,${0.04 + r() * 0.06})`;
    g.beginPath(); g.ellipse(r() * W, H * (0.45 + r() * 0.5), 40 + r() * 80, 10 + r() * 25, 0, 0, 7); g.fill();
  }
  return versTexture(c);
}
