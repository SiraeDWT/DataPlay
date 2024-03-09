"use strict";

//! Add "<input type="file" id="fileInput" accept=".json">" in HTML

// const filePath = '../assets/data/raw_data.json';

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






// -----





// const url = '../assets/data/converted_data.json';

// fetch(url)
//     .then(response => response.json())
//     .then(jsonData => {

//         const countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaidjan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];

//         const filteredData = jsonData.filter(entry => entry.City && countries.some(country => entry.City.includes(country)));

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





// ----- FETCH DATA -----

// fetch(url)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         const countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaidjan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
//         const countryFilter = data.filter(entry => entry.city && countries.some(country => entry.city.includes(country)));

//         console.log(`${countryFilter.length} cas d'OVNI recensés sur ${countries.length} pays d'Europe.`);
//         console.log(countryFilter);
//     })
//     .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));





// ----- TRI -----

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