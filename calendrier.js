// ─────────────────────────────────────────────────────────────
//  Calendrier de l'Avent Kaamelott — fichier de données
//  C'est le seul fichier à modifier pour remplir les cases.
//
//  Pour chaque jour :
//   episode    : titre affiché, ex. "Livre I — Le titre"
//   youtube    : lien YouTube complet OU juste l'identifiant de la vidéo
//   debut/fin  : (facultatif) secondes de début/fin si la vidéo contient
//                plusieurs épisodes. 0 = du début / jusqu'à la fin.
//   repliques  : une ou plusieurs répliques pour ce jour, chacune avec :
//     texte      : la réplique, telle qu'on veut l'afficher
//     personnage : qui la dit (facultatif)
//     gif / mp3  : fichiers déposés dans le dossier "medias",
//                  ex. "medias/02.gif" et "medias/02.mp3"
//
//  salles : dans l'ordre de la visite. Chaque porte mène à la salle
//           suivante de cette liste et s'ouvre à son premier jour.
//
//  decor : répliques affichées sur les parchemins aux murs.
//          Choisir des répliques qui ne sont PAS dans le calendrier
//          (ou déjà révélées) pour ne rien gâcher.
// ─────────────────────────────────────────────────────────────
window.CALENDRIER = {
  annee: 2026,

  salles: [
    { id: "table-ronde",    nom: "La salle de la Table ronde", jours: [1, 2, 3, 4, 5, 6, 7] },
    { id: "salle-a-manger", nom: "La salle à manger",          jours: [8, 9, 10, 11, 12, 13, 14] },
    { id: "chambre-du-roi", nom: "La chambre du roi",          jours: [15, 16, 17, 18, 19, 20, 21] },
    { id: "taverne",        nom: "La taverne",                 jours: [22, 23] },
    { id: "cour-enneigee",  nom: "La cour sous la neige",      jours: [24] }
  ],

  cases: [
    { jour:  1, episode: "Livre III — L'étudiant", youtube: "https://www.youtube.com/watch?v=eRyF_yckoJ4", debut: 0, fin: 0,
      repliques: [
        { texte: "Ah !", personnage: "Perceval", gif: "medias/01-a.gif", mp3: "medias/01-a.mp3" },
        { texte: "Non, non, non, pas de “ah” pas de rien… Maintenant tout le monde écoute !", personnage: "Arthur", gif: "medias/01-b.gif", mp3: "medias/01-b.mp3" }
      ] },
    { jour:  2, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  3, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  4, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  5, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  6, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  7, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  8, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour:  9, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 10, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 11, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 12, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 13, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 14, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 15, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 16, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 17, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 18, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 19, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 20, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 21, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 22, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 23, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
    { jour: 24, episode: "", youtube: "", debut: 0, fin: 0,
      repliques: [ { texte: "", personnage: "", gif: "", mp3: "" } ] },
  ],

  decor: [
    // { replique: "…", personnage: "…" },
  ]
};
