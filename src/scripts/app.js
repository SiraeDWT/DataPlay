"use strict";

// const url = '../assets/data/ufo_data.json';

// fetch(url)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         const shapeFilter = ['Light', 'Circle', 'Cube', 'Egg', 'Triangle', 'Chevron', 'Cigar', 'Sphere', 'Orb', 'Cone', 'Cross', 'Cylinder', 'Diamond', 'Disk', 'Fireball', 'Flash', 'Formation', 'Oval', 'Rectangle', 'Star', 'Teadrop'];

//         shapeFilter.forEach(shapeFilterEl => {
//             const resultShapeFilter = data.filter(entry => entry.shape && entry.shape.includes(shapeFilterEl));

//             console.log(`${resultShapeFilter.length} cas d'OVNI recensés en forme de ${shapeFilterEl} en Europe.`);
//             console.log(resultShapeFilter);
//         })
        
//     })
//     .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));

// -----

//! TOUS LES SCRIPTS qui ont été utilisés pour restructuré et adapté la base de donnée ne sont plus dans les fichiers du projet. Il n'y a plus aucune nécessité de les utiliser puisque la base de donnée JSON est faite et optimisée !