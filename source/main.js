// Calendrier de l'Avent Kaamelott — moteur : salle 3D, déplacements, cases à volets, lecteur plein écran, vue simple
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import * as T from './textures.js';
import { chargerGif } from './gif.js';
import { chargerRessources } from './chargement.js';
import * as tableRonde from './salles/tableRonde.js';

const D = window.CALENDRIER || { annee: 2026, salles: [], cases: [], decor: [] };
// Une entrée par salle modélisée. Les salles suivantes s'ajoutent ici, semaine après semaine.
const CONSTRUCTEURS = { 'table-ronde': { construire: tableRonde.construireTableRonde, ressources: tableRonde.ressources } };

const $ = (s) => document.querySelector(s);
const APERCU = /apercu/.test(location.hash) || /apercu/.test(location.search);
const CLE = 'kaamelott-avent-vus-' + D.annee;
const CLE_APERCU = 'kaamelott-avent-apercu-jour';
const CLE_SALLE = 'kaamelott-avent-salle-vue-';
const OEIL = 1.65;
const MOUVEMENT_REDUIT = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ── Dates ──
// En aperçu, on choisit le jour simulé ; sinon c'est la vraie date.
let jourSimule = 0;
if (APERCU) {
  try { jourSimule = +localStorage.getItem(CLE_APERCU) || 1; } catch { jourSimule = 1; }
}
const dateCase = (j) => new Date(D.annee, 11, j);
function jourDuCalendrier() {
  if (jourSimule) return jourSimule;
  const n = new Date();
  if (n < dateCase(1)) return 0;
  if (n.getFullYear() === D.annee && n.getMonth() === 11) return Math.min(n.getDate(), 25);
  return 25;
}
// une case s'ouvre à sa date…
const estOuverte = (j) => j <= jourDuCalendrier();
// …mais son GIF et sa réplique ne s'affichent au mur que le lendemain (pas de spoil)
const estReveleeAuMur = (j) => j < jourDuCalendrier();

// ── Contenu ──
const infos = (j) => D.cases.find((c) => c.jour === j) || { jour: j };
function idYoutube(v) {
  if (!v) return '';
  const m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v) ? v : '';
}
// Un jour peut avoir une ou plusieurs répliques (l'ancien format à une réplique est accepté aussi)
function repliques(d) {
  if (Array.isArray(d.repliques) && d.repliques.length) {
    return d.repliques.map((r) => ({ texte: r.texte || r.replique || '', personnage: r.personnage || '', gif: r.gif || '', mp3: r.mp3 || '' }));
  }
  return [{ texte: d.replique || '', personnage: d.personnage || '', gif: d.gif || '', mp3: d.mp3 || '' }];
}
const guillemets = (r) => (r.texte ? `« ${r.texte} »` : 'Réplique à renseigner');
const mp3sDu = (d) => repliques(d).map((r) => r.mp3).filter(Boolean);

// ── Cases déjà regardées dans ce navigateur (pour la vue simple) ──
let vus = new Set();
try { vus = new Set(JSON.parse(localStorage.getItem(CLE) || '[]')); } catch { /* stockage indisponible */ }
function marquerVu(j) {
  vus.add(j);
  try { localStorage.setItem(CLE, JSON.stringify([...vus])); } catch { /* tant pis */ }
}

// ── Petits messages ──
let minuteurToast = 0;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.hidden = false;
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => { el.hidden = true; }, 2800);
}

// ── Son ──
let audioCtx = null, sonActif = true, sourcesCourantes = [];
const tampons = new Map();
const dejaJoue = new Set();
function initAudio() {
  if (audioCtx) return;
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume(); } catch { audioCtx = null; }
}
async function tampon(url) {
  let b = tampons.get(url);
  if (!b) {
    const r = await fetch(url);
    b = await audioCtx.decodeAudioData(await r.arrayBuffer());
    tampons.set(url, b);
  }
  return b;
}
function couperSon() {
  for (const s of sourcesCourantes) { try { s.stop(); } catch { /* déjà fini */ } }
  sourcesCourantes = [];
}
// Joue un ou plusieurs fichiers à la suite
async function jouer(urls) {
  const liste = [].concat(urls).filter(Boolean);
  if (!audioCtx || !sonActif || !liste.length) return;
  try {
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    const bufs = await Promise.all(liste.map(tampon));
    couperSon();
    let t = audioCtx.currentTime + 0.02;
    for (const b of bufs) {
      const s = audioCtx.createBufferSource();
      s.buffer = b; s.connect(audioCtx.destination); s.start(t);
      sourcesCourantes.push(s);
      t += b.duration + 0.6;
    }
  } catch { /* fichier absent ou format non pris en charge */ }
}

// ── Plein écran (demandé au moment du toucher, seul moment où le navigateur l'accepte) ──
let pleinEcranParNous = false;
function demanderPleinEcran() {
  const el = document.documentElement;
  if (document.fullscreenElement || !el.requestFullscreen) return;
  el.requestFullscreen().then(() => { pleinEcranParNous = true; }).catch(() => { /* refusé : la page reste en grand */ });
}
function quitterPleinEcran() {
  if (pleinEcranParNous && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  pleinEcranParNous = false;
}

// ── Scène 3D ──
const canvas = $('#scene');
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch { renderer = null; }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 60);
camera.rotation.order = 'YXZ';
// ── Qualité selon l'appareil (et rabaissée automatiquement si ça rame) ──
const TACTILE = matchMedia('(pointer: coarse)').matches;
const MODESTE = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.deviceMemory || 4) <= 3;
let qualite = MODESTE ? 'basse' : TACTILE ? 'moyenne' : 'haute';
const ratioMax = () => (qualite === 'haute' ? 1.75 : qualite === 'moyenne' ? 1.5 : 1.25);

// Étalonnage façon série : ombres légèrement froides, hautes lumières ambrées, couleurs un peu éteintes,
// contraste doux, vignettage et grain de pellicule
const ETALONNAGE = {
  uniforms: { tDiffuse: { value: null }, temps: { value: 0 }, resolution: { value: new THREE.Vector2(1, 1) } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float temps; uniform vec2 resolution; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(vec3(l), c, 0.82);
      vec3 ombres = vec3(0.90, 0.97, 1.05), hautes = vec3(1.07, 1.0, 0.86);
      c *= mix(ombres, hautes, smoothstep(0.05, 0.75, l));
      c = mix(c, c * c * (3.0 - 2.0 * c), 0.22);
      c = c * 0.96 + 0.015;
      float d = distance(vUv, vec2(0.5));
      c *= mix(1.0, 0.5, smoothstep(0.32, 0.86, d));
      float n = fract(sin(dot(vUv * resolution + temps * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
      c += (n - 0.5) * 0.03;
      gl_FragColor = vec4(c, 1.0);
    }`
};
let composer = null, bloom = null, etalonnage = null;
function preparerRendu() {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth / 2, innerHeight / 2), 0.55, 0.55, 0.88);
  bloom.enabled = qualite !== 'basse';
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  etalonnage = new ShaderPass(ETALONNAGE);
  composer.addPass(etalonnage);
  redim();
}
function rendre(t = 0) {
  if (composer) { etalonnage.uniforms.temps.value = t % 100; composer.render(); }
  else renderer.render(scene, camera);
}
function appliquerQualiteSalle() {
  if (!salle?.lumieresOmbre) return;
  for (const l of salle.lumieresOmbre.fortes) l.castShadow = qualite !== 'basse';
  for (const l of salle.lumieresOmbre.legeres) l.shadow.mapSize.set(qualite === 'basse' ? 512 : 1024, qualite === 'basse' ? 512 : 1024);
}
// si l'appareil peine (moins de ~25 images/s), on allège : ombres du feu et halo coupés, moins de pixels
let mesure = { n: 0, somme: 0, fait: false };
function surveillerFluidite(dtReel) {
  if (mesure.fait || qualite === 'basse') return;
  mesure.n++; mesure.somme += dtReel;
  if (mesure.n < 90) return;
  mesure.fait = true;
  if (mesure.somme / mesure.n > 0.04) {
    qualite = 'basse';
    if (bloom) bloom.enabled = false;
    appliquerQualiteSalle();
    redim();
  }
}

function redim() {
  if (!renderer) return;
  const w = innerWidth, h = innerHeight;
  renderer.setPixelRatio(Math.min(devicePixelRatio, ratioMax()));
  renderer.setSize(w, h, false);
  if (composer) {
    composer.setPixelRatio(Math.min(devicePixelRatio, ratioMax()));
    composer.setSize(w, h);
    bloom?.resolution.set(w / 2, h / 2);
    etalonnage?.uniforms.resolution.value.set(w, h);
  }
  camera.aspect = w / h;
  camera.fov = w < h ? 78 : 64;
  camera.updateProjectionMatrix();
}
if (renderer) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  addEventListener('resize', redim);
  redim();
}

let salle = null;
// Salles dans l'ordre du calendrier
const salleVoisine = (id, sens) => { const i = D.salles.findIndex((s) => s.id === id); return i < 0 ? null : D.salles[i + sens] || null; };
const premierJour = (s) => (s?.jours?.length ? Math.min(...s.jours) : 25);
const etat ={ yaw: 0, pitch: -0.04, cible: null, glisse: null };
const gifs = new Map();
let modaleOuverte = false;
let sequenceEnCours = false;

// Libère la mémoire de la salle qu'on quitte (une seule salle chargée à la fois)
function liberer(groupe) {
  groupe.traverse((o) => {
    o.geometry?.dispose();
    for (const m of [].concat(o.material || [])) {
      for (const k of ['map', 'normalMap']) if (m[k] && !m[k].userData?.gif) m[k].dispose();
      m.dispose();
    }
  });
}

// Reflets chauds pour le métal et le cuir : un environnement de feu de bois, très discret
function environnementChaud() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, '#120b06'); gr.addColorStop(0.45, '#5e4430'); gr.addColorStop(0.55, '#b08860'); gr.addColorStop(1, '#1a120c');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 128);
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.SRGBColorSpace;
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromEquirectangular(t).texture;
  pm.dispose(); t.dispose();
  return env;
}

async function chargerSalle(id, progres) {
  const def = CONSTRUCTEURS[id];
  const res = await chargerRessources(def.ressources, progres);
  if (salle) { scene.remove(salle.groupe); liberer(salle.groupe); gifs.clear(); }
  salle = def.construire({ decor: D.decor || [], res });
  salle.id = id;
  // les portes mènent aux salles voisines dans l'ordre de calendrier.js (et s'ouvrent à leur premier jour)
  const suivante = salleVoisine(id, 1), precedente = salleVoisine(id, -1);
  if (salle.porte) { salle.porte.versSalle = suivante?.id || ''; salle.porte.jour = premierJour(suivante); }
  if (salle.porteRetour) salle.porteRetour.versSalle = precedente?.id || '';
  appliquerQualiteSalle();
  scene.add(salle.groupe);
  scene.background = new THREE.Color(salle.brouillard);
  scene.fog = new THREE.Fog(salle.brouillard, 14, 34);
  camera.position.set(salle.depart.x, OEIL, salle.depart.z);
  etat.yaw = salle.depart.yaw; etat.pitch = (salle.depart.pitch ?? 0) + (innerWidth < innerHeight ? 0.06 : 0); etat.cible = null; etat.glisse = null;
  $('#nomSalle').textContent = D.salles.find((s) => s.id === id)?.nom || '';
  dejaJoue.clear();
  for (const j of Object.keys(salle.cases).map(Number)) {
    majCase(j);
    const c = salle.cases[j];
    c.ouverture = c.cible;
    if (distanceCase(j) < 3.2) dejaJoue.add(j);
  }
}

function distanceCase(j) {
  const c = salle.cases[j];
  return Math.hypot(camera.position.x - c.position.x, camera.position.z - c.position.z);
}

function remplacerTexture(mat, tex) {
  if (mat.map && mat.map !== tex && !mat.map.userData?.gif) mat.map.dispose();
  mat.map = tex; mat.color.setScalar(1); mat.needsUpdate = true;
}

// Recadre un GIF dans la case sans couper le bas (où sont les sous-titres)
function ajusterCadre(c, ratioGif, tex) {
  const r = c.cadreRatio;
  if (ratioGif > r) { tex.repeat.set(r / ratioGif, 1); tex.offset.set((1 - r / ratioGif) / 2, 0); }
  else { tex.repeat.set(1, ratioGif / r); tex.offset.set(0, 0); }
}

// État d'une case au mur : fermée, à ouvrir aujourd'hui, ou révélée (dès le lendemain)
function majCase(j) {
  const c = salle?.cases[j];
  if (!c) return;
  const ouverte = estOuverte(j), revelee = estReveleeAuMur(j), d = infos(j);
  for (const m of c.matsVolets) m.color.setScalar(ouverte ? 1 : 0.45);
  c.pulse = ouverte && !revelee;
  c.cible = revelee ? 1 : 0;
  c.lumiereCible = 0;
  if (!revelee) return;

  const R = repliques(d);
  const lignes = R.map(guillemets);
  const persos = [...new Set(R.map((r) => r.personnage).filter(Boolean))];
  if (persos.length === 1) lignes.push('— ' + persos[0]);
  remplacerTexture(c.plaque.material, T.parchemin(lignes, { taille: 40 }));
  const texte = () => remplacerTexture(c.ecran.material, T.parchemin(R.map(guillemets), { W: 512, H: 376, taille: 40, titre: d.episode || '' }));
  const urls = R.map((r) => r.gif).filter(Boolean);
  if (urls.length && !gifs.has(j)) {
    gifs.set(j, null);
    Promise.all(urls.map(chargerGif))
      .then((liste) => {
        for (const g of liste) g.texture.userData.gif = true;
        gifs.set(j, { liste, i: 0, t: 0, c });
        ajusterCadre(c, liste[0].ratio, liste[0].texture);
        remplacerTexture(c.ecran.material, liste[0].texture);
      })
      .catch(() => { gifs.delete(j); texte(); });
  } else if (!urls.length) texte();
}

// ── Déplacements : glisser pour regarder, toucher le sol pour avancer ──
function resoudre(x, z) {
  const L = salle.limites;
  for (let k = 0; k < 2; k++) {
    x = clamp(x, L.minX, L.maxX); z = clamp(z, L.minZ, L.maxZ);
    for (const o of salle.obstacles) {
      const dx = x - o.x, dz = z - o.z, d = Math.hypot(dx, dz);
      if (d < o.r) { const k2 = o.r / (d || 1e-3); x = o.x + dx * k2; z = o.z + dz * k2; }
    }
  }
  return { x, z };
}

const ray = new THREE.Raycaster();
function viser(x, y) {
  const ndc = new THREE.Vector2((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  // les meubles ne bloquent pas le doigt : on cherche la première case, porte ou sol avant un mur
  for (const h of ray.intersectObject(salle.groupe, true)) {
    if (h.object.isSprite) continue;
    if (h.object.userData.action || h.object.userData.sol || h.object.userData.mur) return h;
  }
  return null;
}

function allerA(arret, fin, dureeMin = 0.35) {
  const p = resoudre(arret.x, arret.z);
  const A = { x: camera.position.x, z: camera.position.z };
  // si la table (ou un autre meuble) est sur le chemin, on la contourne par une courbe
  let C = null;
  const dx = p.x - A.x, dz = p.z - A.z, len2 = dx * dx + dz * dz;
  if (len2 > 1e-4) {
    for (const o of salle.obstacles) {
      const t = clamp(((o.x - A.x) * dx + (o.z - A.z) * dz) / len2, 0, 1);
      const px = A.x + dx * t, pz = A.z + dz * t, d = Math.hypot(px - o.x, pz - o.z);
      if (d < o.r && t > 0.05 && t < 0.95) {
        let nx = px - o.x, nz = pz - o.z;
        if (d < 1e-3) { nx = -dz; nz = dx; }
        const k = (o.r + 0.6) / Math.hypot(nx, nz);
        const W = { x: o.x + nx * k, z: o.z + nz * k };
        C = { x: 2 * W.x - (A.x + p.x) / 2, z: 2 * W.z - (A.z + p.z) / 2 };
        break;
      }
    }
  }
  const longueur = C ? (Math.hypot(C.x - A.x, C.z - A.z) + Math.hypot(p.x - C.x, p.z - C.z)) * 0.8 : Math.sqrt(len2);
  etat.cible = null;
  etat.glisse = {
    de: { x: A.x, z: A.z, yaw: etat.yaw, pitch: etat.pitch },
    vers: { x: p.x, z: p.z, yaw: arret.yaw, pitch: arret.pitch ?? -0.02 },
    ctrl: C,
    t: 0, dur: clamp(longueur / 3.4, dureeMin, 2.4), fin
  };
}

function toucher(x, y) {
  if (sequenceEnCours) return;
  const h = viser(x, y);
  if (!h) return;
  const a = h.object.userData.action;
  if (a?.type === 'case') ouvrirDepuisMur(a.jour);
  else if (a?.type === 'porte') toucherPorte();
  else if (a?.type === 'retour') passerLaPorte(-1);
  else if (a?.type === 'livre') allerVersLivre();
  else if (h.object.userData.sol) { etat.glisse = null; etat.cible = resoudre(h.point.x, h.point.z); }
}

// Rectangle à l'écran de l'intérieur d'une case (point de départ de l'agrandissement)
function rectCase(c) {
  const pts = c.coins().map((v) => v.project(camera));
  const xs = pts.map((p) => (p.x + 1) / 2 * innerWidth), ys = pts.map((p) => (1 - p.y) / 2 * innerHeight);
  const l = Math.min(...xs), t = Math.min(...ys);
  return { left: l, top: t, width: Math.max(...xs) - l, height: Math.max(...ys) - t };
}

// Toucher une case : on s'approche, les volets s'ouvrent, la lumière jaillit, la case grandit en plein écran
function ouvrirDepuisMur(j) {
  if (!estOuverte(j)) { toast(`Patience ! Cette case s'ouvre le ${j} décembre.`); return; }
  const c = salle.cases[j];
  demanderPleinEcran();
  sequenceEnCours = true;
  // on recule davantage sur un téléphone en hauteur, pour voir toute la case s'ouvrir
  const recul = innerWidth < innerHeight ? 2.7 : 1.8;
  const arret = {
    x: c.position.x + c.normale.x * recul, z: c.position.z + c.normale.z * recul,
    yaw: c.arret.yaw, pitch: Math.atan2(c.position.y - OEIL, recul)
  };
  allerA(arret, () => {
    const dejaOuverte = c.ouverture > 0.9;
    c.cible = 1; c.lumiereCible = 1;
    setTimeout(() => {
      sequenceEnCours = false;
      ouvrirModale(j, rectCase(c));
    }, MOUVEMENT_REDUIT || dejaOuverte ? 150 : 900);
  }, 0.6);
}

function toucherPorte() {
  const p = salle.porte;
  if (!p.versSalle) { allerA(p.arret); toast('Cette porte ne mène nulle part… pour l\'instant.'); return; }
  if (!estOuverte(p.jour)) { allerA(p.arret); toast(`Cette porte s'ouvrira le ${p.jour} décembre.`); return; }
  passerLaPorte(1);
}

// Point devant une porte, côté salle, à une distance d (regard tourné vers la salle)
function devantPorte(p, d) {
  const g = p.groupe, ry = g.rotation.y;
  return { x: g.position.x + Math.sin(ry) * d, z: g.position.z + Math.cos(ry) * d, yaw: ry + Math.PI, pitch: 0.02 };
}

// Charge une salle et y place le visiteur.
// par 'avant' : on arrive de la salle précédente (par la porte de retour, jusqu'à l'entrée) ;
// par 'arriere' : on revient de la salle suivante (par sa porte, qui se referme derrière nous) ;
// sinon : au point de départ de la salle.
async function arriverDans(id, par) {
  try { localStorage.setItem(CLE_SALLE + id, '1'); } catch { /* rien */ }
  await chargerSalle(id);
  const porte = par === 'avant' ? salle.porteRetour : par === 'arriere' ? salle.porte : null;
  const arrivee = par === 'avant' ? salle.entree || (porte && devantPorte(porte, 2.2)) : porte ? devantPorte(porte, 2.2) : null;
  if (!arrivee) return;
  if (porte && !MOUVEMENT_REDUIT) {
    // on sort de l'embrasure de la porte, qui se referme derrière nous
    const s = devantPorte(porte, 0.9);
    camera.position.set(s.x, OEIL, s.z);
    etat.yaw = arrivee.yaw; etat.pitch = arrivee.pitch ?? 0;
    porte.ouverture = 1; porte.cible = 1;
    allerA(arrivee, () => { porte.cible = 0; }, 1.3);
  } else {
    camera.position.set(arrivee.x, OEIL, arrivee.z);
    etat.yaw = arrivee.yaw; etat.pitch = arrivee.pitch ?? 0;
  }
}

// La porte s'ouvre, on la traverse, et la salle voisine se charge de l'autre côté.
// sens 1 : vers la salle suivante ; sens -1 : retour à la salle précédente.
function passerLaPorte(sens = 1) {
  const p = sens > 0 ? salle.porte : salle.porteRetour;
  if (!p || sequenceEnCours) return;
  if (!p.versSalle) { allerA(p.arret); return; }
  sequenceEnCours = true;
  allerA(p.arret, () => {
    p.cible = 1;
    setTimeout(() => {
      if (!CONSTRUCTEURS[p.versSalle]) {
        toast('La suite du château se prépare… Revenez bientôt !');
        setTimeout(() => { p.cible = 0; sequenceEnCours = false; }, 2200);
        return;
      }
      // on avance à travers la porte pendant que l'écran s'assombrit
      allerA(p.traversee, null, 1.6);
      const fondu = $('#fondu');
      setTimeout(() => fondu.classList.add('actif'), 700);
      setTimeout(async () => {
        await arriverDans(p.versSalle, sens > 0 ? 'avant' : 'arriere');
        fondu.classList.remove('actif');
        sequenceEnCours = false;
      }, 1500);
    }, MOUVEMENT_REDUIT ? 300 : 1700);
  }, 0.8);
}

// Depuis la vue simple : aller directement dans une salle déjà ouverte (fondu au noir)
async function allerDansSalle(id) {
  if (sequenceEnCours || !CONSTRUCTEURS[id] || !salle || id === salle.id) return;
  sequenceEnCours = true;
  const fondu = $('#fondu');
  fondu.classList.add('actif');
  await new Promise((r) => setTimeout(r, MOUVEMENT_REDUIT ? 50 : 800));
  const avant = D.salles.findIndex((s) => s.id === id) > D.salles.findIndex((s) => s.id === salle.id);
  await arriverDans(id, avant ? 'avant' : 'arriere');
  fondu.classList.remove('actif');
  sequenceEnCours = false;
}

let ptr = null;
canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  ptr = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), bouge: 0 };
  canvas.setPointerCapture?.(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (ptr && e.pointerId === ptr.id) {
    const dx = e.clientX - ptr.x, dy = e.clientY - ptr.y;
    ptr.x = e.clientX; ptr.y = e.clientY;
    ptr.bouge += Math.abs(dx) + Math.abs(dy);
    if (ptr.bouge > 8 && !sequenceEnCours) {
      const k = e.pointerType === 'touch' ? 0.006 : 0.004;
      etat.yaw += dx * k;
      etat.pitch = clamp(etat.pitch + dy * k, -0.7, 0.6);
      etat.glisse = null;
    }
  } else if (e.pointerType === 'mouse' && salle) {
    const h = viser(e.clientX, e.clientY);
    canvas.style.cursor = h?.object.userData.action ? 'pointer' : 'grab';
  }
});
canvas.addEventListener('pointerup', (e) => {
  if (!ptr || e.pointerId !== ptr.id) return;
  const tap = ptr.bouge <= 8 && performance.now() - ptr.t < 500;
  ptr = null;
  if (tap && salle) toucher(e.clientX, e.clientY);
});
canvas.addEventListener('pointercancel', () => { ptr = null; });

const touches = new Set();
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (modaleOuverte) fermerModale(); else $('#grille').hidden = true; return; }
  if (modaleOuverte || livreOuvert || sequenceEnCours || e.target.closest?.('input, textarea, select')) return;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'z', 'q'].includes(e.key)) {
    touches.add(e.key); etat.cible = null; etat.glisse = null; e.preventDefault();
  }
});
addEventListener('keyup', (e) => touches.delete(e.key));

// ── Boucle d'animation ──
const horloge = new THREE.Clock();
const lisse = (k) => k * k * (3 - 2 * k);
function angleVers(a, b, k) {
  const d = ((b - a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return a + d * k;
}

function boucle() {
  const dtReel = horloge.getDelta(), dt = Math.min(dtReel, 0.05), t = horloge.elapsedTime;
  if (!salle || modaleOuverte || livreOuvert) { if (salle && livreOuvert) { salle.animer(t); rendre(t); } return; }
  surveillerFluidite(dtReel);

  // clavier (QWERTY et AZERTY)
  const av = (touches.has('ArrowUp') || touches.has('w') || touches.has('z')) - (touches.has('ArrowDown') || touches.has('s'));
  const rot = (touches.has('ArrowLeft') || touches.has('a') || touches.has('q')) - (touches.has('ArrowRight') || touches.has('d'));
  etat.yaw += rot * 1.8 * dt;
  if (av) {
    const p = resoudre(camera.position.x - Math.sin(etat.yaw) * av * 2.6 * dt, camera.position.z - Math.cos(etat.yaw) * av * 2.6 * dt);
    camera.position.x = p.x; camera.position.z = p.z;
  }

  // marche vers un point touché
  if (etat.cible) {
    const dx = etat.cible.x - camera.position.x, dz = etat.cible.z - camera.position.z, d = Math.hypot(dx, dz);
    if (d < 0.04) etat.cible = null;
    else {
      const pas = Math.min(d, 2.6 * dt);
      const p = resoudre(camera.position.x + (dx / d) * pas, camera.position.z + (dz / d) * pas);
      camera.position.x = p.x; camera.position.z = p.z;
    }
  }

  // glissement vers une case
  if (etat.glisse) {
    const g = etat.glisse;
    g.t = Math.min(1, g.t + dt / g.dur);
    const k = lisse(g.t);
    if (g.ctrl) {
      const u = 1 - k;
      camera.position.x = u * u * g.de.x + 2 * u * k * g.ctrl.x + k * k * g.vers.x;
      camera.position.z = u * u * g.de.z + 2 * u * k * g.ctrl.z + k * k * g.vers.z;
    } else {
      camera.position.x = g.de.x + (g.vers.x - g.de.x) * k;
      camera.position.z = g.de.z + (g.vers.z - g.de.z) * k;
    }
    etat.yaw = angleVers(g.de.yaw, g.vers.yaw, k);
    etat.pitch = g.de.pitch + (g.vers.pitch - g.de.pitch) * k;
    if (g.t >= 1) { etat.glisse = null; g.fin?.(); }
  }

  camera.position.y = OEIL;
  camera.rotation.set(etat.pitch, etat.yaw, 0);

  salle.animer(t);
  salle.porte?.animer(dt);
  salle.porteRetour?.animer(dt);
  const auj = jourDuCalendrier();
  for (const c of Object.values(salle.cases)) {
    // volets : ouverture amortie, avec un léger rebond
    const v = MOUVEMENT_REDUIT ? 1 : Math.min(1, dt * 3.2);
    c.ouverture += (c.cible - c.ouverture) * v;
    const a = c.ouverture * 1.95;
    c.volets[0].rotation.y = -a;
    c.volets[1].rotation.y = a;
    c.lumiere += (c.lumiereCible - c.lumiere) * Math.min(1, dt * 4);
    c.halo.material.opacity = c.lumiere * 0.9;
    c.halo.scale.setScalar(1.6 + c.lumiere * 1.6);
    const lueur = c.pulse && c.jour === auj ? 0.18 + 0.16 * Math.sin(t * 3) : 0;
    for (const m of c.matsVolets) m.emissiveIntensity = lueur;
  }

  // GIF des cases révélées ; s'il y en a plusieurs, ils se relaient toutes les 6 secondes
  for (const st of gifs.values()) {
    if (!st) continue;
    st.liste[st.i].avancer(dt * 1000);
    st.t += dt;
    if (st.liste.length > 1 && st.t > 6) {
      st.t = 0;
      st.i = (st.i + 1) % st.liste.length;
      const g = st.liste[st.i];
      ajusterCadre(st.c, g.ratio, g.texture);
      st.c.ecran.material.map = g.texture;
      st.c.ecran.material.needsUpdate = true;
    }
  }

  // réplique jouée à l'approche d'une case révélée au mur
  for (const j of Object.keys(salle.cases).map(Number)) {
    const sons = mp3sDu(infos(j));
    if (!estReveleeAuMur(j) || !sons.length) continue;
    const dist = distanceCase(j);
    if (dist < 2.8 && !dejaJoue.has(j)) { dejaJoue.add(j); jouer(sons); }
    else if (dist > 4) dejaJoue.delete(j);
  }

  rendre(t);
}

// ── Lecteur plein écran ──
let lecteur = null, modaleJour = null, apiYoutube = null;
function chargerApiYoutube() {
  if (window.YT?.Player) return Promise.resolve();
  if (apiYoutube) return apiYoutube;
  apiYoutube = new Promise((ok, ko) => {
    window.onYouTubeIframeAPIReady = () => ok();
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => ko(new Error('API YouTube indisponible'));
    document.head.appendChild(s);
    setTimeout(() => ko(new Error('délai dépassé')), 8000);
  }).catch((e) => { apiYoutube = null; throw e; });
  return apiYoutube;
}

function secours(id, debut) {
  const zone = $('#mLecteur');
  zone.innerHTML = id
    ? `<div class="vide"><p>Le lecteur ne peut pas s'afficher ici.</p><a class="btn" href="https://www.youtube.com/watch?v=${esc(id)}${debut ? '&t=' + (+debut) + 's' : ''}" target="_blank" rel="noopener">Regarder l'épisode sur YouTube</a></div>`
    : `<div class="vide"><p>L'épisode de ce jour n'est pas encore renseigné.</p></div>`;
  $('#mFini').hidden = false;
}

// La case grandit depuis sa place (au mur ou dans la grille) jusqu'à remplir l'écran
function agrandir(rect, fin) {
  const el = $('#ouverture');
  if (!rect || MOUVEMENT_REDUIT) { fin(); return; }
  el.style.transition = 'none';
  Object.assign(el.style, { left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px', opacity: '1' });
  el.hidden = false;
  void el.offsetWidth;
  el.style.transition = '';
  el.classList.add('plein');
  let fait = false;
  const suite = () => {
    if (fait) return; fait = true;
    fin();
    el.classList.add('fondu');
    setTimeout(() => { el.hidden = true; el.classList.remove('plein', 'fondu'); }, 450);
  };
  el.addEventListener('transitionend', suite, { once: true });
  setTimeout(suite, 900);
}

function ouvrirModale(j, rect) {
  const d = infos(j);
  modaleJour = j;
  agrandir(rect, () => {
    modaleOuverte = true;
    $('#mJour').textContent = `${j} décembre`;
    $('#mEpisode').textContent = d.episode || 'Épisode à renseigner';
    $('#mRevel').hidden = true;
    $('#mFini').hidden = true;
    $('#mPasser').hidden = false;
    $('#mPasser').textContent = vus.has(j) ? 'Voir les répliques' : 'Passer directement à la réplique';
    const zone = $('#mLecteur');
    zone.innerHTML = '<div id="yt"></div>';
    const id = idYoutube(d.youtube);
    if (!id) secours('', 0);
    else {
      chargerApiYoutube().then(() => {
        if (modaleJour !== j) return;
        lecteur = new YT.Player('yt', {
          videoId: id, width: '100%', height: '100%',
          playerVars: { autoplay: 1, start: +d.debut || 0, ...(+d.fin ? { end: +d.fin } : {}), rel: 0, playsinline: 1, fs: 1 },
          events: {
            onReady: (e) => { try { e.target.playVideo(); } catch { /* l'utilisateur lancera lui-même */ } },
            onStateChange: (e) => { if (e.data === 0) reveler(); },
            onError: () => secours(id, d.debut)
          }
        });
      }).catch(() => secours(id, d.debut));
    }
    $('#modale').hidden = false;
    $('#modale .fermer').focus({ preventScroll: true });
  });
}

function reveler() {
  const j = modaleJour;
  if (j == null) return;
  const d = infos(j);
  const R = repliques(d);
  $('#mSurTitre').textContent = R.length > 1 ? 'Les répliques du jour' : 'La réplique du jour';
  const liste = $('#mListe');
  liste.innerHTML = '';
  const telecharger = (url, nom, libelle) => {
    const a = document.createElement('a');
    a.className = 'btn'; a.href = url; a.setAttribute('download', nom); a.textContent = libelle;
    return a;
  };
  R.forEach((r, i) => {
    const bloc = document.createElement('div');
    bloc.className = 'replique';
    const q = document.createElement('blockquote');
    q.textContent = guillemets(r);
    bloc.append(q);
    if (r.personnage) {
      const p = document.createElement('p');
      p.className = 'perso'; p.textContent = '— ' + r.personnage;
      bloc.append(p);
    }
    const act = document.createElement('div');
    act.className = 'actions';
    const base = `kaamelott-${String(j).padStart(2, '0')}${R.length > 1 ? '-' + (i + 1) : ''}`;
    if (r.mp3) {
      const b = document.createElement('button');
      b.className = 'btn'; b.textContent = 'Écouter';
      b.addEventListener('click', () => { initAudio(); jouer(r.mp3); });
      act.append(b);
    }
    if (r.gif) act.append(telecharger(r.gif, base + '.gif', 'Télécharger le GIF'));
    if (r.mp3) act.append(telecharger(r.mp3, base + '.mp3', "Télécharger l'audio"));
    if (act.children.length) bloc.append(act);
    liste.append(bloc);
  });
  $('#mSansFichiers').hidden = R.some((r) => r.gif || r.mp3);
  $('#mRevel').hidden = false;
  $('#mRevel').scrollTop = 0;
  $('#mPasser').hidden = true;
  $('#mFini').hidden = true;
  if (!vus.has(j)) { marquerVu(j); majGrille(); }
  try { lecteur?.pauseVideo(); } catch { /* lecteur absent */ }
  jouer(mp3sDu(d));
}

function revoir() {
  const d = infos(modaleJour);
  $('#mRevel').hidden = true;
  $('#mPasser').hidden = false;
  $('#mPasser').textContent = 'Voir les répliques';
  try { lecteur?.seekTo(+d.debut || 0, true); lecteur?.playVideo(); } catch { /* rien */ }
}

function fermerModale() {
  try { lecteur?.destroy(); } catch { /* déjà détruit */ }
  const j = modaleJour;
  lecteur = null; modaleJour = null;
  $('#mLecteur').innerHTML = '';
  $('#modale').hidden = true;
  modaleOuverte = false;
  couperSon();
  quitterPleinEcran();
  horloge.getDelta();
  // la case se referme tant qu'elle n'est pas révélée au mur (le lendemain)
  const c = salle?.cases[j];
  if (c) { c.lumiereCible = 0; if (!estReveleeAuMur(j)) c.cible = 0; }
}

$('#modale .fermer').addEventListener('click', fermerModale);
$('#mPasser').addEventListener('click', () => reveler());
$('#mFini').addEventListener('click', () => reveler());
$('#mRevoir').addEventListener('click', revoir);

// ── Vue simple : grille des 24 cases ──
function majGrille() {
  const auj = jourDuCalendrier();
  $('#gContenu').innerHTML = D.salles.map((s) => {
    const ici = salle && s.id === salle.id;
    const accessible = renderer && salle && !ici && CONSTRUCTEURS[s.id] && estOuverte(premierJour(s));
    const lien = ici ? ' <span class="ici">vous êtes ici</span>'
      : accessible ? ` <button class="lien aller" data-salle="${esc(s.id)}">aller dans cette salle</button>` : '';
    return `
    <section>
      <h3>${esc(s.nom)}${lien}</h3>
      <div class="cases">${s.jours.map((j) => {
        const o = estOuverte(j), v = vus.has(j);
        const cls = !o ? 'fermee' : v ? 'vue' : 'ouverte';
        const lib = !o ? `le ${j} déc.` : v ? 'vue' : 'à ouvrir';
        return `<button class="case ${cls}${j === auj ? ' aujourdhui' : ''}" data-jour="${j}"><span class="num">${j}</span><span class="etat">${lib}</span></button>`;
      }).join('')}</div>
    </section>`;
  }).join('');
}
$('#gContenu').addEventListener('click', (e) => {
  const aller = e.target.closest('.aller');
  if (aller) { $('#grille').hidden = true; allerDansSalle(aller.dataset.salle); return; }
  const b = e.target.closest('.case');
  if (!b) return;
  const j = +b.dataset.jour;
  if (!estOuverte(j)) { toast(`Patience ! Cette case s'ouvre le ${j} décembre.`); return; }
  initAudio();
  demanderPleinEcran();
  ouvrirModale(j, b.getBoundingClientRect());
});
$('#btnGrille').addEventListener('click', () => { majGrille(); $('#grille').hidden = false; });
$('#gFermer').addEventListener('click', () => { if (renderer) $('#grille').hidden = true; });

$('#btnSon').addEventListener('click', () => {
  sonActif = !sonActif;
  $('#btnSon').setAttribute('aria-pressed', String(sonActif));
  $('#btnSon .lib').textContent = sonActif ? 'Son activé' : 'Son coupé';
  if (!sonActif) couperSon();
});

// ── Le livre du pupitre : accueil et mode d'emploi ──
let livreOuvert = true;
let cinematiquePorte = false;
let premiereFermeture = true;

function vueLivre() {
  const v = salle.vueLivre;
  camera.position.set(v.x, OEIL, v.z);
  etat.yaw = v.yaw; etat.pitch = v.pitch;
  camera.rotation.set(etat.pitch, etat.yaw, 0);
}

function allerVersLivre() {
  if (!salle.vueLivre) return;
  sequenceEnCours = true;
  allerA(salle.vueLivre, () => {
    sequenceEnCours = false;
    livreOuvert = true;
    $('#hud').hidden = true;
    const l = $('#livre');
    l.classList.remove('ferme', 'parti');
    l.hidden = false;
  });
}

function fermerLivre() {
  initAudio();
  const l = $('#livre');
  l.classList.add('ferme');
  setTimeout(() => {
    l.classList.add('parti');
    livreOuvert = false;
    horloge.getDelta();
    $('#hud').hidden = false;
    // on se retourne vers la salle… ou, le jour d'une nouvelle salle, on passe la porte
    if (cinematiquePorte && salle.porte) { cinematiquePorte = false; passerLaPorte(); }
    else allerA(salle.depart, null, 1.4);
    if (premiereFermeture) {
      premiereFermeture = false;
      $('#aide').hidden = false;
      setTimeout(() => $('#aide').classList.add('estompe'), 6000);
    }
  }, MOUVEMENT_REDUIT ? 50 : 750);
  setTimeout(() => { l.hidden = true; }, MOUVEMENT_REDUIT ? 100 : 1300);
}

function statut() {
  const auj = jourDuCalendrier();
  if (APERCU) return `Aperçu : on fait comme si on était le ${auj >= 25 ? '25' : auj} décembre.`;
  if (auj === 0) {
    const n = Math.ceil((dateCase(1) - new Date()) / 86400000);
    return n <= 1 ? 'La première case s\'ouvre demain !' : `La première case s'ouvre dans ${n} jours.`;
  }
  if (auj >= 25) return 'Joyeux Noël ! Toutes les cases sont ouvertes.';
  return `Aujourd'hui, la case ${auj} vous attend.`;
}

function preparerApercu() {
  if (!APERCU) return;
  const sel = $('#apJour');
  sel.innerHTML = Array.from({ length: 25 }, (_, i) => i + 1)
    .map((n) => `<option value="${n}"${n === jourSimule ? ' selected' : ''}>${n === 25 ? 'Noël' : n + ' déc.'}</option>`).join('');
  sel.addEventListener('change', () => {
    try { localStorage.setItem(CLE_APERCU, sel.value); } catch { /* rien */ }
    location.reload();
  });
  $('#apReset').addEventListener('click', () => {
    try {
      localStorage.removeItem(CLE);
      for (const k of Object.keys(localStorage)) if (k.startsWith(CLE_SALLE)) localStorage.removeItem(k);
    } catch { /* rien */ }
    location.reload();
  });
  $('#apercu').hidden = false;
}

async function demarrer() {
  $('#statut').textContent = statut();
  preparerApercu();
  const bouton = $('#entrer');
  // les textures écrivent avec les polices médiévales : on les attend (au plus 3 s)
  try {
    await Promise.race([
      Promise.all([document.fonts.load('64px "Uncial Antiqua"'), document.fonts.load('italic 40px "Cormorant Garamond"'), document.fonts.load('40px "Cormorant Garamond"')]),
      new Promise((r) => setTimeout(r, 3000))
    ]);
  } catch { /* polices de secours */ }

  if (!renderer) {
    bouton.disabled = false;
    bouton.textContent = 'Voir les cases';
    bouton.addEventListener('click', () => { initAudio(); $('#livre').hidden = true; majGrille(); $('#grille').hidden = false; });
    return;
  }

  preparerRendu();
  scene.environment = environnementChaud();
  scene.environmentIntensity = 0.3;

  // salle de départ : la plus récente déjà ouverte. Si on ne l'a encore jamais visitée,
  // on démarre dans la précédente pour vivre le passage de la porte.
  const ordre = D.salles.map((x) => x.id).filter((id) => CONSTRUCTEURS[id]);
  let depart = ordre[0] || Object.keys(CONSTRUCTEURS)[0];
  for (const s of D.salles) if (CONSTRUCTEURS[s.id] && estOuverte(s.jours[0])) depart = s.id;
  let dejaVue = false;
  try { dejaVue = !!localStorage.getItem(CLE_SALLE + depart); } catch { dejaVue = true; }
  const i = ordre.indexOf(depart);
  if (i > 0 && !dejaVue) { cinematiquePorte = true; depart = ordre[i - 1]; }
  await chargerSalle(depart, (k) => { bouton.textContent = `Le château se prépare… ${Math.round(k * 100)} %`; });
  if (salle.vueLivre) vueLivre();
  rendre();
  renderer.setAnimationLoop(boucle);

  bouton.disabled = false;
  bouton.textContent = 'Fermer le livre';
  bouton.addEventListener('click', fermerLivre);
}

demarrer();
