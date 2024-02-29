"use strict";

// const filePath = '../assets/data/data.json';

// fetch(filePath)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erreur de chargement du fichier JSON');
//     }
//     return response.json();
//   })
//   .then(jsonData => {
//     const convertedData = jsonData.map(entry => {
//       const keyValuePairs = Object.entries(entry)[0];
//       const [keys, values] = keyValuePairs.map(str => str.split('\t'));

//       const result = {};
//       keys.forEach((key, index) => {
//         result[key] = values[index];
//       });

//       return result;
//     });

//     // Convertir les données en JSON
//     const jsonDataString = JSON.stringify(convertedData, null, 2);

//     // Créer un objet Blob avec le contenu JSON
//     const blob = new Blob([jsonDataString], { type: 'application/json' });

//     // Créer un lien d'ancrage pour le téléchargement
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'converted_data.json'; // Nom du fichier à télécharger

//     // Ajouter le lien d'ancrage au DOM et déclencher le téléchargement
//     document.body.appendChild(a);
//     a.click();

//     // Retirer le lien d'ancrage du DOM après le téléchargement
//     document.body.removeChild(a);
//   })
//   .catch(error => console.error('Erreur de chargement du fichier JSON:', error));


// Remplacez l'URL du fichier JSON par le chemin correct
const url = '../assets/data/converted_data.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Utilise la méthode filter pour obtenir les entrées où la propriété "City" contient "Belgium"
    const entriesWithBelgium = data.filter(entry => entry.City && entry.City.includes('Belgium'));

    console.log(`Le nombre d'entrées où la propriété "City" contient "Belgium" est : ${entriesWithBelgium.length}`);
    console.log("Les entrées sont :", entriesWithBelgium);
  })
  .catch(error => console.error('Une erreur s\'est produite lors de la récupération du fichier JSON:', error));