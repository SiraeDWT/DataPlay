# DataPlay 2024 - Project Data Non Identified

Projet DataPlay 2024

-----

## Workflow with Laravel Mix.

### Install

- `npm install`

### Commands

- `npm start` : run a local server on port 3000
- `npx mix watch` : build on files changes, launch a dev server with browsersync.
- `npm run build` : clean, lint and build the project.
- `npm run clean` : clean the `dist` folder.

### Features

- Copy `src/*.html` to `dist` folder.
- Copy `src/assets/*/` to `dist/assets/*/` folder.
- Compile SASS `src/styles/app.scss` to `dist/styles` folder.
- Bundle and transpile JS `src/scripts/app.js` to `dist/scripts` folder.
- Create sources maps.
- Run a dev web server with browsersync.

### Warning

Not intended to be used in production since minification as been disabled.  
For school project purpose only.

-----

From the **P.D.N.I.** project team - __[_Dylan Vercalsteren_](https://dylan-vercalsteren.be)__, __[_Noa Jacquemin_](http://noa-jacquemin.be/)__, __[_Romain Collin_](http://romaincollin.be/)__,  __[_Thibault Varga_](#)__.