// Semaine 1 — La salle de la Table ronde (cases 1 à 7)
// Ambiance : grosse pierre de taille, cheminée derrière le siège du roi, torches en cage de fer,
// table ronde gainée de cuir rivetée, sièges à haut dossier en pignon, pupitre et vitrail dans un coin.
import * as THREE from 'three';
import * as T from '../textures.js';
import { creerCase, creerPorte, creerParchemin, creerFlamme, creerBraises, creerPoussiere, vaciller, MATERIAUX } from '../elements.js';

const L = 9, P = 7, H = 6.5;          // demi-largeur (x), demi-profondeur (z), hauteur

export const ressources = {
  textures: ['mur', 'sol', 'bois', 'bois-sombre', 'cuir'],
  modeles: { bouclier: 'modeles/kite_shield/modele.json', coupes: 'modeles/brass_goblets/modele.json' }
};

export function construireTableRonde({ decor = [], res }) {
  const groupe = new THREE.Group();
  const flammes = [];
  const add = (m) => { groupe.add(m); return m; };
  const boite = (w, h, d, mat, x, y, z, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.rotation.y = ry; return add(m);
  };

  // ── Matériaux photo ──
  const pierre = (rx, ry, teinte = 0xc9bdae) => res.materiau('mur', rx, ry, { color: teinte, roughness: 0.95, relief: 1.4 });
  const matBois = res.materiau('bois', 1, 1, { color: 0x9a7252, roughness: 0.8 });
  const matBoisSombre = res.materiau('bois-sombre', 1, 1, { color: 0x6e4a36, roughness: 0.75 });
  const fer = MATERIAUX.FER;

  // ── Lumières : la cheminée et les torches, rien d'autre ──
  add(new THREE.HemisphereLight(0xffe9cf, 0x2a2219, 0.85));
  // lumière douce au-dessus de la table, comme sur un plateau de tournage
  const plafonnier = add(new THREE.SpotLight(0xffe2bc, 38, 14, 0.8, 0.95, 1.2));
  plafonnier.position.set(0, 6.2, 0.8);
  plafonnier.target.position.set(0, 0.8, -0.3); add(plafonnier.target);
  plafonnier.castShadow = true;
  plafonnier.shadow.mapSize.set(1024, 1024);
  plafonnier.shadow.bias = -0.0004; plafonnier.shadow.normalBias = 0.02;
  plafonnier.shadow.camera.near = 1; plafonnier.shadow.camera.far = 12;
  const feu = add(new THREE.PointLight(0xff9a4c, 52, 17, 1.5));
  feu.position.set(0, 0.9, -P + 1.1);
  // le feu projette les ombres des sièges et de la table vers la salle
  feu.castShadow = true;
  feu.shadow.mapSize.set(512, 512);
  feu.shadow.bias = -0.002; feu.shadow.normalBias = 0.03;
  feu.shadow.camera.near = 0.3; feu.shadow.camera.far = 16;
  const torches = [];
  const lumiereTorche = (x, y, z) => { const l = add(new THREE.PointLight(0xffc888, 16, 11, 1.5)); l.position.set(x, y, z); torches.push(l); };

  // ── Sol, murs, plafond ──
  const sol = new THREE.Mesh(new THREE.PlaneGeometry(2 * L, 2 * P), res.materiau('sol', 2 * L / 3.2, 2 * P / 3.2, { color: 0x948b80, roughness: 1, relief: 0.8 }));
  sol.rotation.x = -Math.PI / 2; sol.userData.sol = true; add(sol);
  const mur = (w, x, z, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, H), pierre(w / 3.4, H / 3.4));
    m.position.set(x, H / 2, z); m.rotation.y = ry; m.userData.mur = true; add(m);
  };
  mur(2 * L, 0, -P, 0); mur(2 * L, 0, P, Math.PI); mur(2 * P, -L, 0, Math.PI / 2); mur(2 * P, L, 0, -Math.PI / 2);
  const plafond = new THREE.Mesh(new THREE.PlaneGeometry(2 * L, 2 * P), res.materiau('bois-sombre', 4, 3, { color: 0x3a281c }));
  plafond.rotation.x = Math.PI / 2; plafond.position.y = H; plafond.userData.mur = true; add(plafond);
  const matPoutre = res.materiau('bois', 1, 4, { color: 0x5a4030 });
  for (let x = -L + 1.5; x < L; x += 3) boite(0.4, 0.5, 2 * P, matPoutre, x, H - 0.25, 0);

  // ── Mur nord : cheminée entre deux pilastres, arcades de part et d'autre ──
  const matPilastre = pierre(0.25, 1.1, 0xcdb99e);
  for (const x of [-7.55, -2.45, 2.45, 7.55]) {
    boite(0.6, 3.4, 0.32, matPilastre, x, 1.7, -P + 0.16);
    boite(0.82, 0.24, 0.46, matPilastre, x, 3.52, -P + 0.23);
  }
  for (const cx of [-5, 5]) {
    // fond de niche plus sombre, puis arc de pierre
    const s = new THREE.Shape();
    s.moveTo(-2.25, 0); s.lineTo(2.25, 0); s.lineTo(2.25, 3.4); s.absarc(0, 3.4, 2.25, 0, Math.PI, false); s.lineTo(-2.25, 0);
    const niche = new THREE.Mesh(new THREE.ShapeGeometry(s, 24), pierre(1 / 3.4, 1 / 3.4, 0x8d7c69));
    niche.position.set(cx, 0, -P + 0.01); add(niche);
    const arc = new THREE.Shape();
    arc.absarc(0, 0, 2.6, 0, Math.PI, false); arc.lineTo(-2.25, 0); arc.absarc(0, 0, 2.25, Math.PI, 0, true); arc.lineTo(2.6, 0);
    const m = new THREE.Mesh(new THREE.ExtrudeGeometry(arc, { depth: 0.3, bevelEnabled: false, curveSegments: 24 }), pierre(1 / 1.6, 1 / 1.6, 0xcdb99e));
    m.position.set(cx, 3.4, -P); add(m);
  }

  // cheminée
  const zc = -P;
  boite(0.6, 2.1, 0.85, pierre(0.2, 0.7, 0xc4b096), -1.75, 1.05, zc + 0.42);
  boite(0.6, 2.1, 0.85, pierre(0.2, 0.7, 0xc4b096), 1.75, 1.05, zc + 0.42);
  const fondFoyer = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.1), new THREE.MeshStandardMaterial({ color: 0x1a110b, roughness: 1 }));
  fondFoyer.position.set(0, 1.05, zc + 0.02); add(fondFoyer);
  boite(4.6, 0.55, 0.95, matBoisSombre, 0, 2.375, zc + 0.47);
  boite(4.9, 0.1, 1.12, matBoisSombre, 0, 2.7, zc + 0.56);
  boite(4.0, H - 2.75, 0.6, pierre(1.2, 1.1, 0xc9b59a), 0, 2.75 + (H - 2.75) / 2, zc + 0.3);
  boite(3.4, 0.08, 1.5, pierre(1, 0.45, 0x8c7c6c), 0, 0.04, zc + 1.0);
  for (const dx of [-0.45, 0, 0.45]) {
    const buche = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 1.0, 8), matBoisSombre);
    buche.rotation.z = Math.PI / 2; buche.rotation.y = dx * 0.6; buche.position.set(dx * 0.3, 0.2 + Math.abs(dx) * 0.05, zc + 0.6); add(buche);
  }
  for (const sx of [-0.7, 0.7]) boite(0.05, 0.45, 0.6, fer, sx, 0.25, zc + 0.6);
  for (const [dx, s, y] of [[0, 1.2, 0.55], [-0.45, 0.85, 0.45], [0.45, 0.9, 0.45], [0.15, 0.6, 0.9], [-0.2, 0.5, 0.8]]) {
    const f = creerFlamme(s); f.position.set(dx, y, zc + 0.6); add(f); flammes.push(f);
  }

  // bougeoirs sur le manteau
  const matCire = new THREE.MeshStandardMaterial({ color: 0xf0e2c2, roughness: 0.6, emissive: 0x2a1a08 });
  const bougie = (x, y, z, h = 0.22) => {
    const pied = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.07, 0.12, 10), fer); pied.position.set(x, y + 0.06, z); add(pied);
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, h, 10), matCire); b.position.set(x, y + 0.12 + h / 2, z); add(b);
    const f = creerFlamme(0.22); f.position.set(x, y + 0.12 + h + 0.07, z); add(f); flammes.push(f);
  };
  for (const x of [-2.1, -1.6, 2.0]) bougie(x, 2.75, zc + 0.6, 0.18 + Math.abs(x) * 0.03);

  // ── Torches en cage de fer ──
  const torche = (x, y, z, ry) => {
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry;
    const bras = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.42), fer); bras.position.set(0, -0.25, 0.2); g.add(bras);
    const tige = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6), fer); tige.position.set(0, -0.1, 0.42); g.add(tige);
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2;
      const barre = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 4), fer);
      barre.position.set(Math.cos(a) * 0.12, 0.3, 0.42 + Math.sin(a) * 0.12);
      barre.rotation.set(Math.sin(a) * 0.28, 0, -Math.cos(a) * 0.28);
      g.add(barre);
    }
    const anneau = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 6, 20), fer); anneau.rotation.x = Math.PI / 2; anneau.position.set(0, 0.52, 0.42); g.add(anneau);
    const braise = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff8a2a })); braise.position.set(0, 0.22, 0.42); g.add(braise);
    const f1 = creerFlamme(0.75); f1.position.set(0, 0.5, 0.42); g.add(f1); flammes.push(f1);
    const f2 = creerFlamme(0.45); f2.position.set(0.03, 0.72, 0.42); g.add(f2); flammes.push(f2);
    add(g);
    const n = new THREE.Vector3(Math.sin(ry), 0, Math.cos(ry));
    lumiereTorche(x + n.x * 0.6, y + 0.5, z + n.z * 0.6);
  };
  torche(-7.55, 3.0, -P + 0.32, 0); torche(7.55, 3.0, -P + 0.32, 0);
  torche(-5, 3.1, P, Math.PI); torche(5, 3.1, P, Math.PI);

  // ── Chandeliers sur pied près de la cheminée ──
  for (const sx of [-1, 1]) {
    const x = sx * 3.25, z = -P + 0.85;
    const pied = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.55, 6), fer); pied.position.set(x, 0.78, z); add(pied);
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2;
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.4), fer); p.position.set(x + Math.cos(a) * 0.15, 0.08, z + Math.sin(a) * 0.15); p.rotation.y = -a + Math.PI / 2; add(p);
    }
    boite(0.7, 0.04, 0.05, fer, x, 1.55, z);
    for (const dx of [-0.3, -0.1, 0.1, 0.3]) bougie(x + dx, 1.55, z, 0.2 + Math.abs(dx) * 0.2);
  }

  // ── Râtelier d'armes d'hast (mur ouest, côté nord) ──
  const matHampe = res.materiau('bois', 0.2, 2, { color: 0x7a5a40 });
  const acier = new THREE.MeshStandardMaterial({ color: 0xb8bcc0, metalness: 0.85, roughness: 0.35 });
  boite(0.12, 0.1, 1.9, matBoisSombre, -L + 0.12, 2.5, -5.4);
  boite(0.12, 0.1, 1.9, matBoisSombre, -L + 0.12, 0.45, -5.4);
  [-6.1, -5.65, -5.2, -4.75].forEach((z, i) => {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.9, 6), matHampe); h.position.set(-L + 0.26, 1.5, z); add(h);
    if (i % 2) {
      const lame = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.26), acier); lame.position.set(-L + 0.26, 2.75, z + 0.12); add(lame);
    }
    const pointe = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.35, 4), acier); pointe.position.set(-L + 0.26, 3.12, z); add(pointe);
  });

  // ── Bannières rouges, dont deux portent un écu ──
  const tBan = T.banniere(0);
  const banniere = (x, z, ry, avecEcu) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.75), new THREE.MeshStandardMaterial({ map: tBan, roughness: 0.95, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
    m.position.set(x, 3.9, z); m.rotation.y = ry; m.position.addScaledVector(new THREE.Vector3(Math.sin(ry), 0, Math.cos(ry)), 0.05); add(m);
    if (avecEcu) {
      const e = res.modele('bouclier', 0.95);
      if (e) {
        e.position.set(x, 3.25, z); e.rotation.y = ry;
        e.position.addScaledVector(new THREE.Vector3(Math.sin(ry), 0, Math.cos(ry)), 0.16);
        add(e);
      }
    }
  };
  banniere(L, -5.6, -Math.PI / 2, true);
  banniere(7.2, P, Math.PI, true);
  banniere(-7.0, P, Math.PI, false);

  // ── La Table ronde : plateau gainé de cuir, coutures et rivets ──
  const R = 3.0, yT = 0.84;
  const matCuir = res.materiau('cuir', 2, 2, { color: 0xe8b98a, roughness: 0.7, relief: 0.8 });
  const plateau = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.08, 96), [matBoisSombre, matCuir, matBoisSombre]);
  plateau.position.y = yT; plateau.userData.sol = true; add(plateau);
  const ceinture = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.03, R - 0.05, 0.16, 96, 1, true), matBoisSombre);
  ceinture.position.y = yT - 0.1; add(ceinture);
  const matCouture = new THREE.MeshStandardMaterial({ color: 0x3a2414, roughness: 0.9 });
  const matRivet = new THREE.MeshStandardMaterial({ color: 0x8a7458, metalness: 0.7, roughness: 0.4 });
  const rivets = [];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + Math.PI / 8;
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.006, R - 0.4), matCouture);
    c.position.set(Math.sin(a) * (R / 2 + 0.2), yT + 0.042, Math.cos(a) * (R / 2 + 0.2)); c.rotation.y = a; add(c);
    for (let t = 0.5; t < R - 0.1; t += 0.22) rivets.push([Math.sin(a) * t, Math.cos(a) * t]);
  }
  for (let k = 0; k < 120; k++) { const a = (k / 120) * Math.PI * 2; rivets.push([Math.sin(a) * (R - 0.08), Math.cos(a) * (R - 0.08)]); }
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.01, 0.62), new THREE.MeshStandardMaterial({ color: 0x6b5236, metalness: 0.5, roughness: 0.5 }));
  plaque.position.y = yT + 0.045; plaque.rotation.y = Math.PI / 4; add(plaque);
  for (let k = 0; k < 4; k++) { const a = (k / 4) * Math.PI * 2; rivets.push([Math.sin(a) * 0.4, Math.cos(a) * 0.4]); }
  const geoRivet = new THREE.SphereGeometry(0.014, 6, 4);
  const inst = new THREE.InstancedMesh(geoRivet, matRivet, rivets.length);
  const mtx = new THREE.Matrix4();
  rivets.forEach(([x, z], i) => { mtx.makeTranslation(x, yT + 0.045, z); inst.setMatrixAt(i, mtx); });
  add(inst);
  // piétement massif
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    boite(0.18, yT - 0.08, 0.18, matBoisSombre, Math.sin(a) * 2.1, (yT - 0.08) / 2, Math.cos(a) * 2.1);
    const a2 = a + Math.PI / 6, x2 = Math.sin(a2) * 1.82, z2 = Math.cos(a2) * 1.82;
    boite(0.1, 0.12, 2.1, matBoisSombre, x2, 0.18, z2, a2 + Math.PI / 2);
  }

  // casques posés sur la table, devant les sièges
  const matCasque = new THREE.MeshStandardMaterial({ color: 0xc8c8c4, metalness: 0.9, roughness: 0.32 });
  const matFente = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const casque = (a, r) => {
    const g = new THREE.Group();
    const corps = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.27, 16), matCasque); corps.position.y = 0.135; g.add(corps);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), matCasque); dome.scale.y = 0.45; dome.position.y = 0.27; g.add(dome);
    const fente = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.018, 0.02), matFente); fente.position.set(0, 0.19, 0.122); g.add(fente);
    const nasal = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.2, 0.02), matCasque); nasal.position.set(0, 0.12, 0.128); g.add(nasal);
    g.position.set(Math.sin(a) * r, yT + 0.04, Math.cos(a) * r);
    g.rotation.y = a + Math.PI;
    add(g);
  };
  for (const k of [1, 3, 4, 7, 9, 11]) casque(Math.PI + (k / 12) * Math.PI * 2 + 0.12, 2.45);
  const coupes = res.modele('coupes', 0.22);
  if (coupes) { coupes.position.set(0.55, yT + 0.04, 0.35); add(coupes); }

  // ── Sièges à haut dossier en pignon ; celui du roi, devant la cheminée, plus haut ──
  const matSiege = res.materiau('bois', 1, 1, { color: 0x9a6e4c, roughness: 0.8 });
  const pignon = (w, h) => {
    const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false });
  };
  const RC = R + 0.6;
  for (let k = 0; k < 12; k++) {
    if (k === 6) continue;                              // place laissée libre face à l'entrée
    const roi = k === 0;
    const a = (k / 12) * Math.PI * 2 + Math.PI;
    const c = new THREE.Group();
    c.position.set(Math.sin(a) * RC, 0, Math.cos(a) * RC);
    c.rotation.y = a;
    const l = roi ? 0.78 : 0.66, hd = roi ? 1.75 : 1.3, ys = 0.5;
    const part = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matSiege); m.position.set(x, y, z); c.add(m); };
    part(l, 0.07, 0.58, 0, ys, 0);
    part(l - 0.08, hd, 0.06, 0, ys + hd / 2, 0.27);
    for (const sx of [-1, 1]) {
      part(0.08, ys + hd + 0.05, 0.08, sx * l / 2, (ys + hd + 0.05) / 2, 0.27);
      part(0.07, ys, 0.07, sx * (l / 2 - 0.03), ys / 2, -0.25);
      part(0.06, 0.06, 0.55, sx * l / 2, ys + 0.3, 0);
      part(0.06, 0.3, 0.06, sx * l / 2, ys + 0.15, -0.25);
      const fleuron = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 4), matSiege);
      fleuron.position.set(sx * l / 2, ys + hd + 0.12, 0.27); fleuron.rotation.y = Math.PI / 4; c.add(fleuron);
    }
    const pg = new THREE.Mesh(pignon(l + 0.04, roi ? 0.42 : 0.3), matSiege);
    pg.position.set(0, ys + hd, 0.23); c.add(pg);
    if (roi) {
      const pg2 = new THREE.Mesh(pignon(0.4, 0.22), matSiege); pg2.position.set(0, ys + hd + 0.38, 0.23); c.add(pg2);
      for (const sx of [-1, 1]) {
        const listel = new THREE.Mesh(new THREE.BoxGeometry(0.05, hd - 0.2, 0.02), MATERIAUX.OR);
        listel.position.set(sx * 0.22, ys + hd / 2, 0.235); c.add(listel);
      }
    }
    add(c);
  }

  // ── Coin du pupitre : vitrail et lutrin avec le grand livre ──
  const vitre = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.9), new THREE.MeshBasicMaterial({ map: T.vitrail() }));
  vitre.position.set(-L + 0.03, 2.6, 4.6); vitre.rotation.y = Math.PI / 2; add(vitre);
  const haut = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0xb3221d }));
  haut.position.set(-L + 0.03, 3.55, 4.6); haut.rotation.y = Math.PI / 2; add(haut);
  const lumVitrail = add(new THREE.PointLight(0xffc89a, 4, 4, 2)); lumVitrail.position.set(-L + 0.8, 2.6, 4.6);

  const lutrin = new THREE.Group();
  lutrin.position.set(-7.2, 0, 4.6); lutrin.rotation.y = -Math.PI / 2;    // le lecteur se tient côté mur, face aux chevaliers
  const mPied = (w, h, d, x, y, z, m = matBoisSombre) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); lutrin.add(o); return o; };
  mPied(0.12, 1.05, 0.12, 0, 0.525, 0);
  mPied(0.6, 0.08, 0.1, 0, 0.04, 0); mPied(0.1, 0.08, 0.6, 0, 0.04, 0);
  const tablette = mPied(0.72, 0.04, 0.5, 0, 1.12, 0.02);
  tablette.rotation.x = 0.42;
  const livre = new THREE.Group();
  livre.position.set(0, 1.16, 0.03); livre.rotation.x = 0.42; lutrin.add(livre);
  const couverture = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.025, 0.44), new THREE.MeshStandardMaterial({ color: 0x5a1012, roughness: 0.7 }));
  livre.add(couverture);
  const pages = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.035, 0.4), [matCire, matCire, new THREE.MeshStandardMaterial({ map: T.pagesLivre(), roughness: 0.9 }), matCire, matCire, matCire]);
  pages.position.y = 0.028; livre.add(pages);
  const plume = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.32, 4), new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: 0.9 }));
  plume.position.set(0.3, 0.07, 0.12); plume.rotation.set(Math.PI / 2, 0, 0.9); livre.add(plume);
  add(lutrin);
  const bougieLutrin = new THREE.Vector3(-7.2, 0, 4.6);
  bougie(bougieLutrin.x + 0.05, 1.05, bougieLutrin.z - 0.42, 0.2);
  const actionLivre = { type: 'livre' };
  for (const o of [couverture, pages, tablette]) o.userData.action = actionLivre;

  // ── Les sept cases, réparties dans les niches et sur les murs ──
  const cases = {};
  const places = [
    [1, -5, -P, 0], [4, 5, -P, 0],
    [5, -L, -2.2, Math.PI / 2], [2, -L, 1.2, Math.PI / 2],
    [6, L, -3, -Math.PI / 2], [3, L, 3, -Math.PI / 2],
    [7, -2.6, P, Math.PI]
  ];
  for (const [jour, x, z, ry] of places) {
    const c = creerCase(jour, x, z, ry);
    add(c.groupe);
    cases[jour] = c;
  }

  // ── Porte vers la salle suivante (mur est) : la salle et la date viennent de calendrier.js ──
  const porte = creerPorte(L, 0, -Math.PI / 2);
  add(porte.groupe);

  // ── Parchemins de décor ──
  const emplacements = [[L, 1.9, 5.4, -Math.PI / 2], [2.2, 1.9, P, Math.PI]];
  decor.slice(0, emplacements.length).forEach((d, i) => {
    const [x, y, z, ry] = emplacements[i];
    add(creerParchemin(x, y, z, ry, d.replique, d.personnage));
  });

  // ── Braises de la cheminée et poussière dans la lumière ──
  const braises = creerBraises(0, 0.5, zc + 0.6, 70);
  add(braises.objet);
  const poussiere = creerPoussiere({ minX: -L + 1, maxX: L - 1, minY: 0.4, maxY: H - 1, minZ: -P + 1, maxZ: P - 1 }, 220);
  add(poussiere.objet);

  // ── Ombres : tout projette, tout reçoit (sauf les halos, vitres et particules) ──
  groupe.traverse((o) => {
    if (!o.isMesh || o.userData.ignorerOmbre) return;
    o.receiveShadow = true;
    const basique = [].concat(o.material).every((m) => m.isMeshBasicMaterial);
    o.castShadow = !o.userData.mur && !o.userData.sol && !basique && o !== plafond;
  });
  sol.castShadow = false;

  let tPrec = 0;
  return {
    groupe, cases, porte, sol,
    lumieresOmbre: { fortes: [feu], legeres: [plafonnier] },
    limites: { minX: -L + 0.8, maxX: L - 0.8, minZ: -P + 0.8, maxZ: P - 0.8 },
    obstacles: [{ x: 0, z: 0, r: RC + 0.5 }, { x: 0, z: -P + 0.9, r: 1.6 }, { x: -7.2, z: 4.6, r: 0.7 }, { x: -3.25, z: -P + 0.85, r: 0.45 }, { x: 3.25, z: -P + 0.85, r: 0.45 }],
    depart: { x: 0, z: 5.5, yaw: 0, pitch: 0.02 },
    vueLivre: { x: -8.15, z: 4.6, yaw: -Math.PI / 2, pitch: -0.42 },
    brouillard: 0x0e0905,
    animer(t) {
      const dt = Math.min(0.05, Math.max(0, t - tPrec)); tPrec = t;
      vaciller(flammes, t);
      braises.animer(dt, t);
      poussiere.animer(dt, t);
      feu.intensity = 52 + 10 * Math.sin(t * 11.7) + 6 * Math.sin(t * 5.3);
      torches.forEach((l, i) => { l.intensity = 16 + 2.5 * Math.sin(t * (8 + i) + i * 2) + 1.5 * Math.sin(t * 19 + i); });
    }
  };
}
