"use strict";

String.prototype.firstLetterCapitalize = function() {
    return this.replace(/^./, this[0].toUpperCase());
};

String.prototype.translate = function () {
    const mot = this.toLowerCase();
    if (traductions.hasOwnProperty(mot)) {
      return traductions[mot];
    } else {
      return this;
    }
};

const traductions = {
    'austria': 'autriche',
    'belgium': 'belgique',
    'bulgaria': 'bulgarie',
    'croatia': 'croatie',
    'cyprus': 'chypre',
    'czech-republic': 'république tchèque',
    'denmark': 'danemark',
    'estonia': 'estonie',
    'finland': 'finlande',
    'france': 'france',
    'germany': 'allemagne',
    'greece': 'grèce',
    'hungary': 'hongrie',
    'ireland': 'irlande',
    'italy': 'italie',
    'latvia': 'lettonie',
    'lithuania': 'lituanie',
    'luxembourg': 'luxembourg',
    'malta': 'malte',
    'netherlands': 'pays-bas',
    'poland': 'pologne',
    'portugal': 'portugal',
    'romania': 'roumanie',
    'slovakia': 'slovaquie',
    'slovenia': 'slovenie',
    'spain': 'espagne',
    'sweden': 'suède'
};

const ufoUrl = 'assets/data/ufo_data_final.json';

fetch(ufoUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        let countries = [];
        for (let i = 0; i < data.country.length; i++) {
            if (data.country === "czech republic") {
                countries.push('czech-republic')
            } else {
                countries.push(data.country[i].country);
            }  
        }


        const deactivateActiveButton = () => {
            const activeButton = document.querySelector('.data__country.data__country--active');
            if (activeButton) {
                activeButton.classList.remove('data__country--active');
            }
        };

        // const countries = ['austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech-republic', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'];

        let contentText = document.querySelector('.data__content');
        let currentCountry = null;

        countries.forEach(country => {
            let btnCountry = document.getElementById(country);
            

            btnCountry.addEventListener('click', () => {
                const countryFilter = data.ufo.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(country));
                const countryResidentsFilter = data.country.filter(entry => entry.residents && entry.country.toLowerCase().includes(country));

                deactivateActiveButton();

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
                let percentageCountry = ((countryFilter.length / data.ufo.length) * 100).toFixed(2);
                let percentageResidentsByCountry = ((countryFilter.length / countryResidentsFilter[0].residents) * 100).toFixed(4);
    

                if (currentCountry === country) {
                    contentText.classList.remove('data__content--show');
                    btnCountry.classList.remove('data__country--active');
                    currentCountry = null;
                } else {
                    contentText.classList.add('data__content--show');
                    contentText.innerHTML = `
                        <h2>${country.translate().firstLetterCapitalize()}</h2>
                        <p>${countryFilter.length} cas d'OVNI recensés en ${country.translate().firstLetterCapitalize()} sur ${data.ufo.length} cas recensés en Europe.</p>
                        <p>${maxCountCity} cas à ${mostFrequentCity} sur ${countryFilter.length} en ${country.translate().firstLetterCapitalize()}, cela représente ${percentageCity} % des cas du pays.</p>
                        <p>${percentageCountry} % des cas en Europe ont lieu en ${country.translate().firstLetterCapitalize()}.</p>
                        <p>Les habitants de ${country.translate().firstLetterCapitalize()} ont ${percentageResidentsByCountry} % de chance de voir un OVNI.</p>
                    `;
                    currentCountry = country;
                    btnCountry.classList.add('data__country--active');
                }
            });
        });



        const updateData = (year) => {
            const filteredData = data.ufo.filter(entry => {
                let fullYear = entry.momentEvent.dateTimeEvent.slice(-4);
                return fullYear == year;
            });
            return filteredData;
        };
        
        const renderData = (filteredData) => {
            console.log(filteredData);
        };
        
        const slider = document.getElementById("range");
        const output = document.getElementById("date");
        output.innerHTML = slider.value; // Donnée affichée avant le clique
        
        const updateSlider = () => {
            const filteredData = updateData(slider.value);
            renderData(filteredData);


            const sliderPosition = (slider.value - slider.min) / (slider.max - slider.min);
            const sliderWidth = slider.getBoundingClientRect().width;
            const newPosition = (sliderWidth * sliderPosition) - (output.offsetWidth / 2);
            output.style.left = newPosition + 'px';
        };

        const displaySlider = () => {
            output.innerHTML = slider.value;


            const sliderPosition = (slider.value - slider.min) / (slider.max - slider.min);
            const sliderWidth = slider.getBoundingClientRect().width;
            const newPosition = (sliderWidth * sliderPosition) - (output.offsetWidth / 2);
            output.style.left = newPosition + 'px';
        };
        
        slider.addEventListener('input', displaySlider); // Utiliser un 'input' event pour juste changer l'affichage de la date à l'utilisateur
        slider.addEventListener('change', updateSlider);

        window.addEventListener('resize', displaySlider);
        
        renderData(updateData(slider.value));

    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));


//! Lieux inconnus pour: France, Malte, Pologne, Portugal.

//TODO: RECUPERER LE PAYS AVEC LE PLUS HAUT TAUX DE CAS / Zapper les villes inconnues ? / Calculer la proba par habitant de voir un ovni dans un pays (exemple: en Belgique, un habitant à xx.xx % de proba de voir un ovni (sur base du nombre de cas et du nombre d'habitants))   

//? Afficher la ville dans laquelle on a le plus de proba de voir un ovni

// -----

// Réfléchir à la probabilité de voir quelle forme dans quel pays. (Exemple: En Belgique, on a 15 % de proba de voir triangle, 12 % de voir oval, ... DONC celui qui a le plus de % est celui avec la plus haute proba de rencontre. Exemple: En Belgique, l'ovni le plus probable d'observer est le triangle avec 15 %.)
// Faire une moyenne et dire combien de % de proba on a de voir un ovni dans un pays. (Exemple: L'allemagne a 36 % de proba de rencontre d'ovni)

// Fun Fact: Sur X ovnis recensé en Europe, X ovnis ont été aperçu entre telle et telle date
// Fun Fact: Selon les observations, il est plus probable d'apercevoir un ovni entre telle et telle heure

// Prendre le nombre d'habitant d'un pays et faire une stat de combien de % ont vu un ovni dans le pays
// Prendre le nombre d'habitant total en Europe et faire une stat pour voir combien de % ont vu un ovni en Europe



document.addEventListener("DOMContentLoaded", function(event) {
    let tooltip = document.getElementById('tooltip');
    let buttons = document.getElementsByClassName('data__tooltip');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('mouseover', function(event) {
            tooltip.style.display = 'block';
            // Modifier le texte de la tooltip ici
            tooltip.innerHTML = "? Afficher"; // Par exemple
        });

        buttons[i].addEventListener('mousemove', function(event) {
            updateTooltipPosition(event);
        });

        buttons[i].addEventListener('mouseout', function(event) {
            tooltip.style.display = 'none';
        });
    }

    function updateTooltipPosition(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        tooltip.style.left = (mouseX + 10) + 'px';
        tooltip.style.top = (mouseY + 10) + 'px';
    }
});