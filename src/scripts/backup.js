"use strict";



// const ufoUrl = '/assets/data/ufo_data_final.json';

// fetch(ufoUrl)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(`${data.length} cas d'ovnis recensés en Europe.\n---`);

//         const shapeFilter = ['Light', 'Circle', 'Cube', 'Egg', 'Triangle', 'Chevron', 'Cigar', 'Sphere', 'Orb', 'Cone', 'Cross', 'Cylinder', 'Diamond', 'Disk', 'Fireball', 'Flash', 'Formation', 'Oval', 'Rectangle', 'Star', 'Teadrop'];

//         shapeFilter.forEach(shapeFilterEl => {
//             const resultShapeFilter = data.filter(entry => entry.shape && entry.shape.includes(shapeFilterEl));

//             console.log(`${resultShapeFilter.length} cas d'OVNI recensés en forme de ${shapeFilterEl} en Europe.`);
//             // console.log(resultShapeFilter);
//         })
        
//     })
//     .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));




// -----




// const countryUrl = '/assets/data/country_data.json';

// fetch(countryUrl)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         let countries = ['austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czechRepublic', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'];

//         let totalResidents = 0;

//         for (let i = 0; i < countries.length; i++) {
//             let countryData = data.find(item => Object.keys(item)[0] === countries[i]);
            
//             if (countryData) {
//                 let residents = countryData[countries[i]].residents;
//                 totalResidents += residents;
//                 // console.log(`${countries[i]} a ${residents} résidents.`);
//             }
//         }

//         console.log(`Il y a en tout ${totalResidents} personnes sur ${data.length} pays d'Europe`);
//     })
//     .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));




// -----





// const countryFilter = data.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(country));

// let counts = {};

// for (let i = 0; i < countryFilter.length; i++) {
//     let city = countryFilter[i].location.city;
//     if (counts[city] === undefined) {
//         counts[city] = 1;
//     } else {
//         counts[city]++;
//     }
// }

// let mostFrequentCity;
// let maxCountCity = 0;

// for (let city in counts) {
//     if (counts[city] > maxCountCity) {
//         maxCountCity = counts[city];
//         mostFrequentCity = city;
//     }
// }

// if (mostFrequentCity === "") {
//     mostFrequentCity = "lieu inconnu";
// }


// let percentageCity = ((maxCountCity / countryFilter.length) * 100).toFixed(2);
// let percentageCountry = ((countryFilter.length / data.length) * 100).toFixed(2);

// console.log(`
//     ${countryFilter.length} cas d'OVNI recensés en ${country.firstLetterCapitalize()} sur ${data.length} cas recensés en Europe.
//     ${maxCountCity} cas à ${mostFrequentCity} sur ${countryFilter.length} en ${country.firstLetterCapitalize()}, cela représente ${percentageCity} % des cas du pays.
//     ${percentageCountry} % des cas en Europe ont lieu à ${country.firstLetterCapitalize()}.
// `); 