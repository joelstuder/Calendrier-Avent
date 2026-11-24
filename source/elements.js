// Éléments communs à toutes les salles : cases (écu + cadre + plaque), porte, parchemins, flammes
import * as THREE from 'three';
import * as T from './textures.js';

const OR = new THREE.MeshStandardMaterial({ color: 0xc89b3c, metalness: 0.85, roughness: 0.35 });
const FER = new THREE.MeshStandardMaterial({ color: 0x2b2826, metalness: 0.7, roughness: 0.55 });
let haloTex = null;

// Écu (forme de bouclier) : la face prend la texture, la tranche est dorée
function geometrieEcu() {
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0.5); s.lineTo(0.5, 0.5); s.lineTo(0.5, 0.05);
  s.quadraticCurveTo(0.47, -0.42, 0, -0.65);
  s.quadraticCurveTo(-0.47, -0.42, -0.5, 0.05);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.03, bevelSegments: 2, curveSegments: 18 });
}
let geoEcu = null;

// Normale sortante d'un mur selon l'orientation de l'objet
export function normale(rotY) { return new THREE.Vector3(Math.sin(rotY), 0, Math.cos(rotY)); }

// Une case du calendrier : une petite fenêtre au mur, fermée par deux volets peints
const BOIS_VOLET = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.85 });
export function creerCase(jour, x, z, rotY, { hauteur = 2.0, recul = 1.7 } = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  const W = 1.3, Hc = 0.95, cy = hauteur;

  // fond de la case : lueur, puis GIF ou réplique une fois révélée au mur
  const ecran = new THREE.Mesh(new THREE.PlaneGeometry(W, Hc), new THREE.MeshBasicMaterial({ map: T.lueur() }));
  ecran.position.set(0, cy, 0.02);
  g.add(ecran);

  // encadrement de pierre et filet doré
  const pierre = new THREE.MeshStandardMaterial({ color: 0x8f816c, roughness: 0.95 });
  const e = 0.14;
  for (const [w, h, px, py] of [[W + 2 * e, e, 0, Hc / 2 + e / 2], [W + 2 * e, e * 1.4, 0, -Hc / 2 - e * 0.7], [e, Hc, W / 2 + e / 2, 0], [e, Hc, -W / 2 - e / 2, 0]]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.22), pierre);
    m.position.set(px, cy + py, 0.09);
    g.add(m);
  }
  const filet = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 6, 16), OR);
  filet.position.set(0, cy + Hc / 2 + e + 0.05, 0.12); g.add(filet);

  // volets : chacun pivote sur sa charnière extérieure
  const tex = T.volets(jour);
  const texG = tex.clone(); texG.repeat.set(0.5, 1); texG.offset.set(0, 0); texG.needsUpdate = true;
  const texD = tex.clone(); texD.repeat.set(0.5, 1); texD.offset.set(0.5, 0); texD.needsUpdate = true;
  const matG = new THREE.MeshStandardMaterial({ map: texG, roughness: 0.8, emissive: 0xffc860, emissiveIntensity: 0 });
  const matD = new THREE.MeshStandardMaterial({ map: texD, roughness: 0.8, emissive: 0xffc860, emissiveIntensity: 0 });
  const geoV = new THREE.BoxGeometry(W / 2, Hc, 0.04);
  const pivotG = new THREE.Group(); pivotG.position.set(-W / 2, cy, 0.06);
  const voletG = new THREE.Mesh(geoV, [BOIS_VOLET, BOIS_VOLET, BOIS_VOLET, BOIS_VOLET, matG, BOIS_VOLET]);
  voletG.position.x = W / 4; pivotG.add(voletG);
  const pivotD = new THREE.Group(); pivotD.position.set(W / 2, cy, 0.06);
  const voletD = new THREE.Mesh(geoV, [BOIS_VOLET, BOIS_VOLET, BOIS_VOLET, BOIS_VOLET, matD, BOIS_VOLET]);
  voletD.position.x = -W / 4; pivotD.add(voletD);
  g.add(pivotG, pivotD);

  // lumière qui s'échappe à l'ouverture
  haloTex ??= T.halo();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  halo.position.set(0, cy, 0.25); halo.scale.setScalar(2.2);
  g.add(halo);

  // plaque : la date, puis la réplique à partir du lendemain
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.46), new THREE.MeshStandardMaterial({ map: T.parchemin([`${jour} décembre`], { taille: 52 }), roughness: 0.9 }));
  plaque.position.set(0, cy - Hc / 2 - 0.5, 0.04);
  g.add(plaque);

  const action = { type: 'case', jour };
  for (const m of [ecran, voletG, voletD, plaque]) m.userData.action = action;

  const n = normale(rotY);
  return {
    groupe: g, ecran, plaque, halo, jour, action,
    volets: [pivotG, pivotD], matsVolets: [matG, matD],
    ouverture: 0, cible: 0, lumiere: 0, lumiereCible: 0,
    position: new THREE.Vector3(x, cy, z).addScaledVector(n, 0.05),
    normale: n,
    arret: { x: x + n.x * recul, z: z + n.z * recul, yaw: rotY, pitch: Math.atan2(cy - 1.65, recul) },
    cadreRatio: W / Hc,
    coins() {
      g.updateMatrixWorld(true);
      return [[-W / 2, Hc / 2], [W / 2, Hc / 2], [-W / 2, -Hc / 2], [W / 2, -Hc / 2]]
        .map(([a, b]) => ecran.localToWorld(new THREE.Vector3(a, b, 0)));
    }
  };
}

// Porte vers la salle suivante : un battant cintré qui pivote sur ses gonds, un passage lumineux derrière
export function creerPorte(x, z, rotY, libelle = '') {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = rotY;
  const matPorte = new THREE.MeshStandardMaterial({ map: T.porte(), roughness: 0.85, side: THREE.DoubleSide });

  // passage derrière la porte (invisible tant qu'elle est fermée)
  const s = new THREE.Shape();
  s.moveTo(-0.95, 0); s.lineTo(0.95, 0); s.lineTo(0.95, 2.5); s.absarc(0, 2.5, 0.95, 0, Math.PI, false); s.lineTo(-0.95, 0);
  const geoPassage = new THREE.ShapeGeometry(s, 20);
  const uv = geoPassage.attributes.uv, pos = geoPassage.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + 0.95) / 1.9, pos.getY(i) / 3.45);
  const matPassage = new THREE.MeshBasicMaterial({ map: T.passage(), transparent: true, opacity: 0, depthWrite: false });
  const passage = new THREE.Mesh(geoPassage, matPassage);
  passage.position.z = 0.015; g.add(passage);
  const fond = new THREE.Mesh(geoPassage, new THREE.MeshBasicMaterial({ color: 0x080504 }));
  fond.position.z = 0.01; g.add(fond);

  // battant, articulé sur le côté gauche
  const battant = new THREE.Group();
  battant.position.set(-0.95, 0, 0.06);
  const bas = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.5, 0.08), matPorte);
  bas.position.set(0.95, 1.25, 0);
  const haut = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.08, 24, 1, false, -Math.PI / 2, Math.PI), matPorte);
  haut.rotation.x = -Math.PI / 2; haut.position.set(0.95, 2.5, 0);
  const anneau = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 20), FER);
  anneau.position.set(1.5, 1.2, 0.07);
  battant.add(bas, haut, anneau);
  g.add(battant);

  const pierre = new THREE.MeshStandardMaterial({ color: 0x8a7a64, roughness: 0.95 });
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.26, 2.5, 0.3), pierre);
    m.position.set(sx * 1.08, 1.25, 0.08); g.add(m);
  }
  const arc = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.14, 8, 24, Math.PI), pierre);
  arc.position.set(0, 2.5, 0.08); g.add(arc);

  const action = { type: 'porte' };
  for (const m of [bas, haut]) m.userData.action = action;
  if (libelle) {
    const ecriteau = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.6), new THREE.MeshStandardMaterial({ map: T.parchemin([libelle], { taille: 40, W: 640, H: 224 }), roughness: 0.9 }));
    ecriteau.position.set(0, 3.95, 0.06); ecriteau.userData.action = action; g.add(ecriteau);
  }
  const n = normale(rotY);
  return {
    groupe: g, action, battant, passage,
    ouverture: 0, cible: 0,
    arret: { x: x + n.x * 2.4, z: z + n.z * 2.4, yaw: rotY, pitch: 0.05 },
    // point de l'autre côté de la porte, pour la traversée
    traversee: { x: x - n.x * 1.2, z: z - n.z * 1.2, yaw: rotY, pitch: 0.02 },
    animer(dt) {
      this.ouverture += (this.cible - this.ouverture) * Math.min(1, dt * 1.6);
      battant.rotation.y = -this.ouverture * 1.75;
      matPassage.opacity = Math.min(1, this.ouverture * 1.6);
    }
  };
}

// Braises qui s'envolent d'un foyer
export function creerBraises(cx, cy, cz, n = 70) {
  haloTex ??= T.halo();
  const pos = new Float32Array(n * 3), vit = [], vie = [];
  const reset = (i, debut) => {
    pos[i * 3] = cx + (Math.random() - 0.5) * 1.4;
    pos[i * 3 + 1] = cy + Math.random() * 0.3;
    pos[i * 3 + 2] = cz + (Math.random() - 0.5) * 0.5;
    vit[i] = [(Math.random() - 0.5) * 0.25, 0.5 + Math.random() * 0.9, 0.15 + Math.random() * 0.25];
    vie[i] = debut ? Math.random() * 3 : 0;
  };
  for (let i = 0; i < n; i++) reset(i, true);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: haloTex, color: 0xffa045, size: 0.07, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  pts.userData.ignorerOmbre = true;
  return {
    objet: pts,
    animer(dt, t) {
      for (let i = 0; i < n; i++) {
        vie[i] += dt;
        if (vie[i] > 2.2 + (i % 5) * 0.3 || pos[i * 3 + 1] > cy + 3.2) { reset(i, false); continue; }
        const v = vit[i];
        pos[i * 3] += (v[0] + Math.sin(t * 3 + i) * 0.12) * dt;
        pos[i * 3 + 1] += v[1] * dt;
        pos[i * 3 + 2] += v[2] * dt;
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}

// Poussière en suspension, qui flotte dans la lumière
export function creerPoussiere(boite, n = 220) {
  haloTex ??= T.halo();
  const pos = new Float32Array(n * 3), base = [];
  for (let i = 0; i < n; i++) {
    base.push([boite.minX + Math.random() * (boite.maxX - boite.minX), boite.minY + Math.random() * (boite.maxY - boite.minY), boite.minZ + Math.random() * (boite.maxZ - boite.minZ), Math.random() * 10]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: haloTex, color: 0xffe6c0, size: 0.035, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
  pts.userData.ignorerOmbre = true;
  return {
    objet: pts,
    animer(dt, t) {
      for (let i = 0; i < n; i++) {
        const [x, y, z, p] = base[i];
        pos[i * 3] = x + Math.sin(t * 0.13 + p) * 0.35;
        pos[i * 3 + 1] = y + Math.sin(t * 0.09 + p * 2) * 0.25;
        pos[i * 3 + 2] = z + Math.cos(t * 0.11 + p) * 0.35;
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}

// Parchemin de décor (répliques hors calendrier)
export function creerParchemin(x, y, z, rotY, texte, auteur) {
  const lignes = [texte]; if (auteur) lignes.push('— ' + auteur);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.86), new THREE.MeshStandardMaterial({ map: T.parchemin(lignes, { W: 512, H: 340, taille: 34 }), roughness: 0.9 }));
  m.position.set(x, y, z); m.rotation.y = rotY;
  m.position.addScaledVector(normale(rotY), 0.04);
  return m;
}

// Flamme : halo additif qui vacille (bougies, torches, cheminée)
export function creerFlamme(echelle = 0.25) {
  haloTex ??= T.halo();
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  s.scale.setScalar(echelle);
  s.userData.base = echelle;
  s.userData.phase = Math.random() * 10;
  return s;
}

export function vaciller(flammes, t) {
  for (const f of flammes) {
    const p = f.userData.phase;
    const k = 1 + 0.12 * Math.sin(t * 9 + p) + 0.08 * Math.sin(t * 23 + p * 2);
    f.scale.set(f.userData.base * k, f.userData.base * k * 1.25, 1);
  }
}

// Torche murale
export function creerTorche(x, y, z, rotY) {
  const g = new THREE.Group();
  g.position.set(x, y, z); g.rotation.y = rotY;
  const support = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.3), FER);
  support.position.set(0, 0, 0.15);
  const manche = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.55, 8), new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 }));
  manche.position.set(0, 0.15, 0.32); manche.rotation.x = 0.35;
  const coupe = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.05, 0.12, 10), FER);
  coupe.position.set(0, 0.42, 0.42);
  const f = creerFlamme(0.55);
  f.position.set(0, 0.6, 0.45);
  g.add(support, manche, coupe, f);
  return { groupe: g, flamme: f };
}

export const MATERIAUX = { OR, FER };
