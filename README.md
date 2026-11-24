# Calendrier de l'Avent Kaamelott

Site familial : un château en 3D où chaque jour de décembre ouvre une case avec un épisode et ses répliques cultes.

## Remplir une case
Tout se passe dans **calendrier.js** (un bloc par jour) et dans le dossier **medias/** (GIF et MP3 de chaque jour).

```js
{ jour: 2, episode: "Livre … — Titre", youtube: "lien YouTube", debut: 0, fin: 0,
  repliques: [ { texte: "…", personnage: "…", gif: "medias/02.gif", mp3: "medias/02.mp3" } ] },
```

## Tester avant le jour J
Ajouter `#apercu` à la fin de l'adresse : un menu permet de choisir un « jour simulé ».

## Organisation
- `index.html`, `style.css`, `calendrier.js` : la page et les données
- `js/app.js` : le moteur 3D compilé (ne pas modifier à la main)
- `source/` : le code du moteur et des salles (`source/salles/`)
- `textures/`, `modeles/` : textures et objets 3D libres de droits (Poly Haven, CC0)
- `medias/` : GIF et MP3 des répliques (générés sur kaamelott.fspot.org)

Après une modification dans `source/`, lancer `./build.sh` pour régénérer `js/app.js`.
