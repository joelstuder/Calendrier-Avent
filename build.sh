#!/bin/sh
# Reconstruit js/app.js à partir du code source (dossier source/)
npm install --silent
npx esbuild source/main.js --bundle --format=esm --minify --target=es2020 --outfile=js/app.js
