"use strict";

// const url = '../assets/data/ufo_data.json';

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const shapeFilter = ['Light', 'Circle', 'Cube', 'Egg', 'Triangle', 'Chevron', 'Cigar', 'Sphere', 'Orb', 'Cone', 'Cross', 'Cylinder', 'Diamond', 'Disk', 'Fireball', 'Flash', 'Formation', 'Oval', 'Rectangle', 'Star', 'Teadrop'];

        shapeFilter.forEach(shapeFilterEl => {
            const resultShapeFilter = data.filter(entry => entry.shape && entry.shape.includes(shapeFilterEl));

            console.log(`${resultShapeFilter.length} cas d'OVNI recensés en forme de ${shapeFilterEl} en Europe.`);
            console.log(resultShapeFilter);
        })
        
    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));

// -----

// const url = '../assets/data/ufo_data.json';

// fetch(url)
//     .then(response => response.json())
//     .then(jsonData => {

//         const countries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'];

//         const filteredData = jsonData.filter(entry => entry.city && countries.some(country => entry.city.includes(country)));

//         // Convertir toutes les clés en minuscules et ajouter une clé "id"
//         const processedData = filteredData.map((entry, index) => {
//             const processedEntry = { id: index + 1 };
//             for (const key in entry) {
//                 processedEntry[key.toLowerCase()] = entry[key];
//             }
//             return processedEntry;
//         });

//         // Trier le tableau par ordre croissant de "month/year of event"
//         processedData.sort((a, b) => {
//             const dateA = new Date(a['month/year of event']);
//             const dateB = new Date(b['month/year of event']);
//             return dateA - dateB;
//         });

//         // Créer un nouveau fichier JSON avec les objets filtrés, triés, et clés en minuscules
//         const newJsonData = JSON.stringify(processedData, null, 2);

//         // Créer un lien de téléchargement
//         const blob = new Blob([newJsonData], { type: 'application/json' });
//         const downloadLink = document.createElement('a');
//         downloadLink.href = URL.createObjectURL(blob);
//         downloadLink.download = 'nouveau_fichier.json';

//         // Simuler un clic sur le lien pour déclencher le téléchargement
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//     })
//     .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));


// -----
