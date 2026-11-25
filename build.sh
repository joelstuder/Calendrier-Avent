#!/bin/sh
# Reconstruit js/app.js à partir du code source (dossier source/),
# puis met à jour les numéros de version dans index.html (?v=…) pour que
# les navigateurs chargent tout de suite les nouveaux fichiers au lieu de
# garder l'ancienne version en cache. À lancer avant chaque envoi sur GitHub,
# y compris après une simple modification de calendrier.js ou style.css.
set -e
cd "$(dirname "$0")"
npm install --silent
npx esbuild source/main.js --bundle --format=esm --minify --target=es2020 --outfile=js/app.js
for f in style.css calendrier.js js/app.js; do
  v=$(md5sum "$f" | cut -c1-8)
  sed -i -E "s#\"$f(\?v=[0-9a-f]+)?\"#\"$f?v=$v\"#" index.html
done
