"use strict";

String.prototype.firstLetterCapitalize = function() {
    return this.replace(/^./, this[0].toUpperCase());
};


const ufoUrl = 'assets/data/ufo_data_final.json';

fetch(ufoUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        console.log(data.country);

        const countries = ['austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', /*'czech republic',*/ 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'];

        let contentText = document.querySelector('.data__content');
        let currentCountry = null;

        countries.forEach(country => {
            let btnCountry = document.getElementById(country);
            

            btnCountry.addEventListener('click', () => {
              const countryFilter = data.ufo.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(country));

              let counts = {};
  
              for (let i = 0; i < countryFilter.length; i++) {
                  let city = countryFilter[i].location.city;
                  if (counts[city] === undefined) {
                      counts[city] = 1;
                  } else {
                      counts[city]++;
                  }
              }
  
              let mostFrequentCity;
              let maxCountCity = 0;
  
              for (let city in counts) {
                  if (counts[city] > maxCountCity) {
                      maxCountCity = counts[city];
                      mostFrequentCity = city;
                  }
              }
  
              if (mostFrequentCity === "") {
                  mostFrequentCity = "lieu inconnu";
              }
  
  
              let percentageCity = ((maxCountCity / countryFilter.length) * 100).toFixed(2);
              let percentageCountry = ((countryFilter.length / data.length) * 100).toFixed(2);
  

              if (currentCountry === country) {
                  contentText.classList.remove('data__content--show');
                  currentCountry = null;
              } else {
                  contentText.classList.add('data__content--show');
                  contentText.innerHTML = `
                    <p>${countryFilter.length} cas d'OVNI recensés en ${country.firstLetterCapitalize()} sur ${data.length} cas recensés en Europe.</p>
                    <p>${maxCountCity} cas à ${mostFrequentCity} sur ${countryFilter.length} en ${country.firstLetterCapitalize()}, cela représente ${percentageCity} % des cas du pays.</p>
                    <p>${percentageCountry} % des cas en Europe ont lieu à ${country.firstLetterCapitalize()}.</p>
                  `;
                  currentCountry = country;
              }
            });
        });


        // Lieux inconnus pour: France, Malte, Pologne, Portugal.

        //TODO: RECUPERER LE PAYS AVEC LE PLUS HAUT TAUX DE CAS / Zapper les villes inconnues ? / Calculer la proba par habitant de voir un ovni dans un pays (exemple: en Belgique, un habitant à xx.xx % de proba de voir un ovni (sur base du nombre de cas et du nombre d'habitants))   

        // Afficher la ville dans laquelle on a le plus de proba de voir un ovni !
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
