// Chevaliers attablés autour de la Table ronde.
// Personnages originaux, inspirés de la légende arthurienne et de l'armement médiéval :
// ils ne représentent aucun personnage de la série ni aucun acteur.
// Chaque chevalier : jambes fixes + buste (torse, bras, tête) qui respire et bouge doucement.
// Les pièces sont fusionnées par matériau pour rester légères sur iPad.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const HAUT = V(0, 1, 0);

// ── Matériaux (partagés par tous les chevaliers) ──
function texMaille() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#2a2a2a'; g.fillRect(0, 0, 128, 128);
  g.lineWidth = 2.2;
  for (let r = 0; r < 16; r++) {
    for (let k = -1; k < 17; k++) {
      const x = k * 8 + (r % 2 ? 4 : 0), y = r * 8 + 4;
      const v = 150 + ((r * 7 + k * 13) % 5) * 14;
      g.strokeStyle = `rgb(${v},${v},${v - 6})`;
      g.beginPath(); g.ellipse(x, y, 4.2, 3.4, 0, 0, Math.PI * 2); g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
let MAT = null;
function materiaux() {
  if (MAT) return MAT;
  MAT = {
    acier: new THREE.MeshStandardMaterial({ color: 0xc4c6c8, metalness: 0.9, roughness: 0.3 }),
    maille: new THREE.MeshStandardMaterial({ color: 0xb4b4b0, map: texMaille(), metalness: 0.75, roughness: 0.5 }),
    tissu: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92 }),
    cuir: new THREE.MeshStandardMaterial({ color: 0x4a2e1c, roughness: 0.8 }),
    or: new THREE.MeshStandardMaterial({ color: 0xc89b3c, metalness: 0.85, roughness: 0.35 }),
    sombre: new THREE.MeshBasicMaterial({ color: 0x0b0908 })
  };
  return MAT;
}

// ── Petits outils de géométrie ──
const tmp = new THREE.Object3D();
function place(geo, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  tmp.position.set(x, y, z); tmp.rotation.set(rx, ry, rz); tmp.scale.set(sx, sy, sz);
  tmp.updateMatrix(); geo.applyMatrix4(tmp.matrix); return geo;
}
// cylindre d'un point à un autre (rayon r1 en a, r2 en b)
function entre(a, b, r1, r2, seg = 10) {
  const d = b.clone().sub(a); const L = d.length();
  const g = new THREE.CylinderGeometry(r2, r1, L, seg);
  const m = new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(HAUT, d.normalize()), V(1, 1, 1));
  return g.applyMatrix4(m);
}
// regroupe les pièces par matériau, puis fusionne
class Lot {
  constructor() { this.p = {}; }
  ajouter(mat, geo, couleur) {
    let g = geo.index ? geo.toNonIndexed() : geo;
    g.clearGroups();
    if (mat === 'tissu') {
      const c = new THREE.Color(couleur), n = g.attributes.position.count, a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
      g.setAttribute('color', new THREE.BufferAttribute(a, 3));
    }
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) g.deleteAttribute(k);
    (this.p[mat] ||= []).push(g);
  }
  vers(groupe) {
    const M = materiaux();
    for (const [k, geos] of Object.entries(this.p)) groupe.add(new THREE.Mesh(mergeGeometries(geos), M[k]));
  }
}

// ── Casques (centre de la tête en T, l'avant vers -z) ; renvoie la hauteur du sommet ──
function coifFace(L, T) {
  L.ajouter('maille', place(new THREE.SphereGeometry(0.128, 16, 12), T.x, T.y - 0.01, T.z, 0, 0, 0, 1, 1.12, 1));
  L.ajouter('sombre', place(new THREE.SphereGeometry(0.1, 14, 10), T.x, T.y - 0.03, T.z - 0.085, 0, 0, 0, 0.7, 0.85, 0.5));
}
const CASQUES = {
  // heaume : grand cylindre fermé, fentes en croix
  heaume(L, T) {
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.13, 0.142, 0.3, 20), T.x, T.y, T.z));
    L.ajouter('acier', place(new THREE.SphereGeometry(0.13, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), T.x, T.y + 0.15, T.z, 0, 0, 0, 1, 0.35, 1));
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.147, 0.147, 0.03, 20), T.x, T.y - 0.135, T.z));
    for (const s of [-1, 1]) L.ajouter('sombre', place(new THREE.BoxGeometry(0.085, 0.016, 0.02), T.x + s * 0.055, T.y + 0.045, T.z - 0.134, 0, s * 0.35, 0));
    L.ajouter('acier', place(new THREE.BoxGeometry(0.026, 0.27, 0.016), T.x, T.y - 0.005, T.z - 0.14));
    for (const [x, y] of [[0.05, -0.04], [0.075, -0.04], [0.1, -0.04], [0.05, -0.075], [0.075, -0.075], [0.1, -0.075]]) {
      L.ajouter('sombre', place(new THREE.SphereGeometry(0.008, 5, 4), T.x + x, T.y + y, T.z - Math.sqrt(0.139 ** 2 - x * x)));
    }
    return 0.195;
  },
  // bassinet à bec : crâne en ogive et visière pointue
  bec(L, T, c) {
    const prof = [[0.13, -0.12], [0.136, 0], [0.125, 0.08], [0.09, 0.15], [0.04, 0.19], [0.001, 0.205]].map(([x, y]) => new THREE.Vector2(x, y));
    L.ajouter('acier', place(new THREE.LatheGeometry(prof, 20), T.x, T.y, T.z));
    L.ajouter('acier', place(new THREE.ConeGeometry(0.105, 0.17, 16), T.x, T.y - 0.01, T.z - 0.15, -Math.PI / 2, 0, 0, 1, 1, 0.85));
    for (const s of [-1, 1]) {
      L.ajouter('sombre', place(new THREE.BoxGeometry(0.05, 0.014, 0.05), T.x + s * 0.042, T.y + 0.04, T.z - 0.115, 0, 0, -s * 0.5));
      L.ajouter('or', place(new THREE.SphereGeometry(0.016, 8, 6), T.x + s * 0.133, T.y, T.z - 0.02));
    }
    for (const [x, y] of [[0, -0.07], [0.03, -0.065], [-0.03, -0.065]]) L.ajouter('sombre', place(new THREE.SphereGeometry(0.007, 5, 4), T.x + x, T.y + y, T.z - 0.15));
    L.ajouter('maille', place(new THREE.CylinderGeometry(0.128, 0.2 * c, 0.17, 18), T.x, T.y - 0.2, T.z, 0, 0, 0, 1, 1, 0.85));
    return 0.205;
  },
  // casque conique à nasal sur un camail
  conique(L, T) {
    coifFace(L, T);
    L.ajouter('acier', place(new THREE.ConeGeometry(0.14, 0.22, 20), T.x, T.y + 0.15, T.z));
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.144, 0.144, 0.035, 20), T.x, T.y + 0.045, T.z));
    L.ajouter('acier', place(new THREE.BoxGeometry(0.03, 0.17, 0.016), T.x, T.y - 0.035, T.z - 0.143));
    return 0.26;
  },
  // chapel de fer : bord large et incliné, sur un camail
  chapel(L, T) {
    coifFace(L, T);
    L.ajouter('acier', place(new THREE.SphereGeometry(0.138, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), T.x, T.y + 0.045, T.z, 0, 0, 0, 1, 0.92, 1));
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.145, 0.25, 0.045, 24), T.x, T.y + 0.03, T.z));
    L.ajouter('acier', place(new THREE.BoxGeometry(0.014, 0.03, 0.24), T.x, T.y + 0.17, T.z));
    return 0.18;
  },
  // barbute : casque arrondi avec ouverture en T
  barbute(L, T) {
    const prof = [[0.136, -0.17], [0.143, -0.05], [0.14, 0.05], [0.12, 0.13], [0.07, 0.18], [0.001, 0.195]].map(([x, y]) => new THREE.Vector2(x, y));
    L.ajouter('acier', place(new THREE.LatheGeometry(prof, 20), T.x, T.y, T.z));
    L.ajouter('sombre', place(new THREE.BoxGeometry(0.05, 0.15, 0.03), T.x, T.y - 0.075, T.z - 0.132));
    L.ajouter('sombre', place(new THREE.BoxGeometry(0.15, 0.045, 0.03), T.x, T.y + 0.02, T.z - 0.126));
    L.ajouter('acier', place(new THREE.BoxGeometry(0.014, 0.035, 0.2), T.x, T.y + 0.19, T.z));
    return 0.2;
  },
  // salade à queue, avec bavière qui protège le bas du visage
  salade(L, T) {
    const prof = [[0.132, -0.06], [0.142, 0.03], [0.122, 0.12], [0.06, 0.17], [0.001, 0.18]].map(([x, y]) => new THREE.Vector2(x, y));
    L.ajouter('acier', place(new THREE.LatheGeometry(prof, 20), T.x, T.y, T.z));
    L.ajouter('acier', place(new THREE.BoxGeometry(0.24, 0.018, 0.17), T.x, T.y - 0.09, T.z + 0.15, -0.55, 0, 0));
    L.ajouter('sombre', place(new THREE.BoxGeometry(0.17, 0.018, 0.03), T.x, T.y + 0.025, T.z - 0.128));
    L.ajouter('sombre', place(new THREE.SphereGeometry(0.1, 12, 8), T.x, T.y - 0.03, T.z - 0.02, 0, 0, 0, 1, 0.8, 1));
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.125, 0.16, 0.16, 16, 1, false, Math.PI / 2, Math.PI), T.x, T.y - 0.13, T.z));
    L.ajouter('or', place(new THREE.SphereGeometry(0.014, 8, 6), T.x, T.y - 0.07, T.z - 0.14));
    return 0.18;
  }
};

// ── Cimiers (posés au sommet du casque) ──
const CIMIERS = {
  couronne(L, T, h) {
    L.ajouter('or', place(new THREE.CylinderGeometry(0.135, 0.138, 0.05, 20), T.x, T.y + h - 0.045, T.z));
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      L.ajouter('or', place(new THREE.ConeGeometry(0.022, 0.07, 6), T.x + Math.sin(a) * 0.13, T.y + h + 0.01, T.z + Math.cos(a) * 0.13));
      L.ajouter('or', place(new THREE.SphereGeometry(0.012, 6, 4), T.x + Math.sin(a) * 0.13, T.y + h + 0.05, T.z + Math.cos(a) * 0.13));
    }
  },
  plumet(L, T, h, couleur) {
    for (let k = -2; k <= 2; k++) {
      L.ajouter('tissu', place(new THREE.ConeGeometry(0.028, 0.32, 6), T.x + k * 0.02, T.y + h + 0.12, T.z + 0.06, 0.45 + Math.abs(k) * 0.08, 0, -k * 0.18, 1, 1, 0.6), couleur);
    }
    L.ajouter('or', place(new THREE.CylinderGeometry(0.02, 0.026, 0.05, 8), T.x, T.y + h, T.z + 0.02));
  },
  ailes(L, T, h, couleur) {
    for (const s of [-1, 1]) L.ajouter('tissu', place(new THREE.SphereGeometry(1, 12, 8), T.x + s * 0.07, T.y + h + 0.07, T.z + 0.02, 0, 0, s * 0.35, 0.012, 0.14, 0.11), couleur);
  },
  cornes(L, T, h, couleur) {
    // de chaque côté, une corne qui part du casque, monte et s'écarte
    for (const s of [-1, 1]) {
      L.ajouter('tissu', place(new THREE.TorusGeometry(0.11, 0.019, 6, 14, Math.PI * 0.5), T.x + s * 0.245, T.y + h - 0.09, T.z, 0, s < 0 ? Math.PI : 0, Math.PI / 2), couleur);
      L.ajouter('tissu', place(new THREE.ConeGeometry(0.019, 0.05, 6), T.x + s * 0.245, T.y + h + 0.04, T.z), couleur);
    }
  },
  boule(L, T, h) {
    L.ajouter('acier', place(new THREE.CylinderGeometry(0.012, 0.018, 0.06, 6), T.x, T.y + h + 0.02, T.z));
    L.ajouter('or', place(new THREE.SphereGeometry(0.035, 12, 8), T.x, T.y + h + 0.07, T.z));
  }
};

// ── Poses des bras : [coude, poignet] dans le repère du siège (assis, regard vers -z) ──
const BRAS = {
  table: (s) => [V(s * 0.3, 0.9, -0.3), V(s * 0.17, 0.93, -0.6)],
  cuisse: (s) => [V(s * 0.3, 0.82, 0.0), V(s * 0.2, 0.71, -0.26)],
  croise: (s) => [V(s * 0.27, 0.87 + (s > 0 ? 0.01 : 0), -0.06), V(-s * 0.06, 0.93 + (s > 0 ? 0.04 : 0), -0.17)],
  coupe: (s) => [V(s * 0.33, 0.98, -0.22), V(s * 0.27, 1.25, -0.36)]
};
const POSES = {
  table: { penche: -0.15, g: 'table', d: 'table' },
  adosse: { penche: 0.1, g: 'cuisse', d: 'cuisse' },
  croise: { penche: 0.02, g: 'croise', d: 'croise' },
  coupe: { penche: -0.12, g: 'table', d: 'coupe' },
  poing: { penche: -0.05, g: 'table', d: 'cuisse' }
};

export function creerChevalier({ couleur, couleur2 = couleur, motif = 'uni', casque = 'heaume', cimier = null, couleurCimier = couleur2, pose = 'table', carrure = 1, phase = 0 }) {
  const racine = new THREE.Group();
  const c = carrure;
  const P = POSES[pose];

  // jambes, immobiles
  const J = new Lot();
  for (const s of [-1, 1]) {
    const hanche = V(s * 0.11, 0.6, 0.04), genou = V(s * 0.13, 0.6, -0.4), cheville = V(s * 0.14, 0.1, -0.44);
    J.ajouter('maille', entre(hanche, genou, 0.082, 0.07, 10));
    J.ajouter('acier', place(new THREE.SphereGeometry(0.066, 10, 8), genou.x, genou.y + 0.01, genou.z - 0.01));
    J.ajouter('acier', entre(genou, cheville, 0.057, 0.047, 10));
    J.ajouter('acier', place(new THREE.BoxGeometry(0.1, 0.07, 0.25), s * 0.14, 0.035, -0.5));
    J.ajouter('tissu', place(new THREE.BoxGeometry(0.2, 0.03, 0.42), s * 0.11, 0.69, -0.15), motif === 'parti' && s > 0 ? couleur2 : couleur);
  }
  J.ajouter('tissu', place(new THREE.BoxGeometry(0.2, 0.3, 0.025), 0, 0.53, -0.37), couleur);
  J.vers(racine);

  // buste : pivote à la hanche
  const buste = new THREE.Group();
  buste.position.set(0, 0.6, 0.04); buste.rotation.x = P.penche;
  racine.add(buste);
  buste.updateMatrix();
  const inv = buste.matrix.clone().invert();
  const loc = (v) => v.clone().applyMatrix4(inv);
  const B = new Lot();

  // cotte d'armes (torse aplati), avec ses motifs héraldiques
  const rB = 0.185 * c, rH = 0.21 * c, yB = 0.02, yH = 0.58, ap = 0.64;
  const rA = (y) => rB + (rH - rB) * (y - yB) / (yH - yB);
  const pan = (y0, y1, t0, tl, col, e = 0) => B.ajouter('tissu', place(new THREE.CylinderGeometry(rA(y1) + e, rA(y0) + e, y1 - y0, 20, 1, false, t0, tl), 0, (y0 + y1) / 2, 0, 0, 0, 0, 1, 1, ap), col);
  if (motif === 'parti') { pan(yB, yH, 0, Math.PI, couleur2); pan(yB, yH, Math.PI, Math.PI, couleur); }
  else pan(yB, yH, 0, Math.PI * 2, couleur);
  const e = 0.006;
  if (motif === 'croix') { pan(0.16, 0.54, Math.PI - 0.2, 0.4, couleur2, e); pan(0.34, 0.41, Math.PI - 0.8, 1.6, couleur2, e); }
  if (motif === 'fasce') pan(0.27, 0.39, 0, Math.PI * 2, couleur2, e);
  if (motif === 'pal') pan(yB, yH, Math.PI - 0.32, 0.64, couleur2, e);
  // ceinture et boucle
  B.ajouter('cuir', place(new THREE.CylinderGeometry(rA(0.14) + 0.012, rA(0.1) + 0.012, 0.05, 20), 0, 0.12, 0, 0, 0, 0, 1, 1, ap));
  B.ajouter('or', place(new THREE.BoxGeometry(0.05, 0.045, 0.015), 0, 0.12, -(rA(0.12) + 0.012) * ap - 0.006));
  // pèlerine de mailles, cou, épaulières
  B.ajouter('maille', place(new THREE.CylinderGeometry(0.085, 0.215 * c, 0.13, 18), 0, 0.6, 0, 0, 0, 0, 1, 1, 0.78));
  B.ajouter('maille', place(new THREE.CylinderGeometry(0.072, 0.08, 0.12, 12), 0, 0.68, 0));
  for (const s of [-1, 1]) {
    B.ajouter('acier', place(new THREE.SphereGeometry(0.1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), s * 0.205 * c, 0.5, 0, 0, 0, s * 0.25, 1.1, 0.85, 1));
    B.ajouter('acier', place(new THREE.CylinderGeometry(0.104, 0.112, 0.045, 14), s * 0.21 * c, 0.475, 0, 0, 0, s * 0.25, 1.1, 1, 1));
  }

  // bras
  for (const s of [-1, 1]) {
    const [coudeM, poignetM] = BRAS[s < 0 ? P.g : P.d](s);
    const epaule = V(s * 0.21 * c, 0.47, 0);
    const coude = loc(coudeM), poignet = loc(poignetM);
    B.ajouter('maille', entre(epaule, coude, 0.058, 0.052, 10));
    B.ajouter('acier', place(new THREE.SphereGeometry(0.06, 10, 8), coude.x, coude.y, coude.z));
    B.ajouter('acier', entre(coude, poignet, 0.05, 0.043, 10));
    const dir = poignet.clone().sub(coude).normalize();
    B.ajouter('acier', entre(poignet.clone().addScaledVector(dir, -0.01), poignet.clone().addScaledVector(dir, 0.035), 0.056, 0.058, 10));
    const bout = poignet.clone().addScaledVector(dir, 0.115);
    B.ajouter('acier', entre(poignet, bout, 0.046, 0.04, 8));
    B.ajouter('acier', place(new THREE.SphereGeometry(0.04, 8, 6), bout.x, bout.y, bout.z));
    if ((s < 0 ? P.g : P.d) === 'coupe') {
      const h = bout.clone().add(V(0, 0.02, 0));
      B.ajouter('or', place(new THREE.CylinderGeometry(0.008, 0.008, 0.07, 6), h.x, h.y + 0.02, h.z));
      B.ajouter('or', place(new THREE.CylinderGeometry(0.03, 0.03, 0.008, 12), h.x, h.y - 0.015, h.z));
      B.ajouter('or', place(new THREE.CylinderGeometry(0.048, 0.026, 0.08, 14), h.x, h.y + 0.09, h.z));
    }
  }

  // tête et casque
  const T = V(0, 0.81, 0);
  const sommet = CASQUES[casque](B, T, c);
  if (cimier) CIMIERS[cimier](B, T, sommet, couleurCimier);
  B.vers(buste);

  const penche = P.penche;
  return {
    groupe: racine,
    animer(t) {
      // respiration et léger balancement, chacun à son rythme
      buste.rotation.x = penche + 0.012 * Math.sin(t * 1.25 + phase);
      buste.rotation.y = 0.05 * Math.sin(t * 0.23 + phase * 2.1) + 0.025 * Math.sin(t * 0.61 + phase);
      buste.rotation.z = 0.015 * Math.sin(t * 0.37 + phase * 1.3);
      buste.scale.set(1 + 0.006 * Math.sin(t * 1.25 + phase), 1, 1 + 0.01 * Math.sin(t * 1.25 + phase));
    }
  };
}

// Couleurs héraldiques
export const EMAUX = {
  gueules: 0x8e1b1b, azur: 0x1f3f7a, sinople: 0x2f5d32, sable: 0x1e1b19,
  or: 0xb8902f, argent: 0xd8d4c8, pourpre: 0x5a2a55, tanne: 0x9a5a22
};
