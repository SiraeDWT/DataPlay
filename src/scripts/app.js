"use strict";

const ufoUrl = '../assets/data/ufo_data_final.json';

fetch(ufoUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const shapeFilter = ['Light', 'Circle', 'Cube', 'Egg', 'Triangle', 'Chevron', 'Cigar', 'Sphere', 'Orb', 'Cone', 'Cross', 'Cylinder', 'Diamond', 'Disk', 'Fireball', 'Flash', 'Formation', 'Oval', 'Rectangle', 'Star', 'Teadrop'];

        shapeFilter.forEach(shapeFilterEl => {
            const resultShapeFilter = data.filter(entry => entry.shape && entry.shape.includes(shapeFilterEl));

            console.log(`${resultShapeFilter.length} cas d'OVNI recensés en forme de ${shapeFilterEl} en Europe.`);
            // console.log(resultShapeFilter);
        })
        
    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));





const countryUrl = '../assets/data/country_data.json';

fetch(countryUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let countries = ['austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czechRepublic', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'];

        let totalResidents = 0;

        for (let i = 0; i < countries.length; i++) {
            let countryData = data.find(item => Object.keys(item)[0] === countries[i]);
            
            if (countryData) {
                let residents = countryData[countries[i]].residents;
                totalResidents += residents;
                // console.log(`${countries[i]} a ${residents} résidents.`);
            }
        }

        console.log(`Il y a en tout ${totalResidents} personnes sur ${data.length} pays d'Europe`);
    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));














// -----

//! TOUS LES SCRIPTS qui ont été utilisés pour restructuré et adapté la base de donnée ne sont plus dans les fichiers du projet. Il n'y a plus aucune nécessité de les utiliser puisque la base de donnée JSON est faite et optimisée !


// Réfléchir à la probabilité de voir quelle forme dans quel pays. (Exemple: En Belgique, on a 15 % de proba de voir triangle, 12 % de voir oval, ... DONC celui qui a le plus de % est celui avec la plus haute proba de rencontre. Exemple: En Belgique, l'ovni le plus probable d'observer est le triangle avec 15 %.)
// Faire une moyenne et dire combien de % de proba on a de voir un ovni dans un pays. (Exemple: L'allemagne a 36 % de proba de rencontre d'ovni)

// Fun Fact: Sur X ovnis recensé en Europe, X ovnis ont été aperçu entre telle et telle date
// Fun Fact: Selon les observations, il est plus probable d'apercevoir un ovni entre telle et telle heure

// Prendre le nombre d'habitant d'un pays et faire une stat de combien de % ont vu un ovni dans le pays
// Prendre le nombre d'habitant total en Europe et faire une stat pour voir combien de % ont vu un ovni en Europe