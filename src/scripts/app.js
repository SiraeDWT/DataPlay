"use strict";

const { dumpWebpackConfig } = require("laravel-mix");

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

//! Changing, unknown, <empty string>, undefined, other: with other.svg
//! Il manque egg, sphere
//! C'est quoi cube et etoile ?

function eventChangeOnload() {
    // Simuler le premier check pour ne pas devoir attendre le change event
    let dateCheckbox = document.getElementById("date-checkbox");
    dateCheckbox.checked = false;

    let changeEvent = new Event('change');
    dateCheckbox.dispatchEvent(changeEvent);
}

window.onload = function() {
    eventChangeOnload();
};

// let beginBtn = document.getElementById('begin-btn');
// let backBtn = document.getElementById('back-btn');
// let presentationSection = document.querySelector('.presentation');
// let appSection = document.querySelector('.data');

// beginBtn.addEventListener('click', () => {
//     presentationSection.classList.add('presentation--hide');
//     appSection.classList.add('data--show');
// });

// backBtn.addEventListener('click', () => {
//     presentationSection.classList.remove('presentation--hide');
//     appSection.classList.remove('data--show');
// });


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


        const unselectCountry = () => {
            const activeButton = document.querySelector('.data__country.data__country--active');
            if (activeButton) {
                activeButton.classList.remove('data__country--active');
            }
        };



        const shapesBtn = document.querySelectorAll('.shapes__btn');

        shapesBtn.forEach(button => {
            button.addEventListener('click', function() {
                if (button.classList.contains('shapes__btn--active')) {
                    button.classList.remove('shapes__btn--active');
                } else {
                    shapesBtn.forEach(btn => {
                        btn.classList.remove('shapes__btn--active');
                    });
                    button.classList.add('shapes__btn--active');
                }
            });
        });

       
        countries.forEach(country => {
            let btnCountry = document.getElementById(country);
            

            const dateCheckbox = document.getElementById('date-checkbox');

            dateCheckbox.addEventListener('change', function() {
                let slider = document.querySelector('.data__slider');
                let sliderInput = document.querySelector('.data__input');


                let contentText = document.querySelector('.data__content');
                let probaArea = document.querySelector('.data__list');

                let currentCountry = null;
                

                if (dateCheckbox.checked) {
                    slider.classList.add('data__slider--show');
                    sliderInput.disabled = false;

                    // let contentText = document.querySelector('.data__content');
                    // let probaArea = document.querySelector('.data__list');
                    // let currentCountry = null;

                    btnCountry.addEventListener('click', () => {
                        const countryFilter = data.ufo.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(country));
                        const dateFilter = data.ufo.filter(entry => {
                            const slider = document.getElementById("range");
                            let year = entry.momentEvent.dateTimeEvent.split('/')[2];
                            return year === slider.value;
                        });
        
        
                        const slider = document.getElementById("range");
                        const output = document.getElementById("date");
                        output.innerHTML = slider.value;
        
                        let dataByDate = [];
        
                        for (let i = 0; i < countryFilter.length; i++) {
                            if (countryFilter[i].momentEvent.dateTimeEvent.slice(-4) == slider.value) {
                                dataByDate.push(countryFilter[i])
                            }
                        }
                        
        
                        unselectCountry();
        
                        let counts = {};
            
                        for (let i = 0; i < dataByDate.length; i++) {
                            let city = dataByDate[i].location.city;
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
            
            
                        
        
                        
                        let percentageCity = ((maxCountCity / dataByDate.length) * 100).toFixed(2);
                        let percentageCountry = ((dataByDate.length / dateFilter.length) * 100).toFixed(2);
            
        
                        
        
                        if (currentCountry === country) {
                            contentText.classList.remove('data__content--show');
                            probaArea.classList.remove('data__list--show');
                            btnCountry.classList.remove('data__country--active');
                            currentCountry = null;
                        } else {
                            contentText.classList.add('data__content--show');
                            probaArea.classList.add('data__list--show');
        
                            if (dataByDate.length > 0) {

                                contentText.innerHTML = `
                                    <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (${slider.value})</h2>
                                `;

                                probaArea.innerHTML = `
                                    <li class="data__el"><span class="data__important">${dataByDate.length}</span><span>OVNI</span></li>
                                    <li class="data__el"><span class="data__important">${maxCountCity}</span><span>${mostFrequentCity}</span></li>
                                    <li class="data__el"><span class="data__important">${percentageCountry} %</span><span>% Europe</span></li>
                                    <li class="data__el"><span class="data__important">${dateFilter.length}</span><span>Europe</span></li>  
                                `;
        
                                currentCountry = country;
                                btnCountry.classList.add('data__country--active');
                            } else {
                                contentText.innerHTML = `
                                    <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (${slider.value})</h2>
                                `;

                                probaArea.innerHTML = `
                                    <p class="data__text text">Il n'y a eu aucun cas d'OVNI recensés en ${country.translate().firstLetterCapitalize()} en ${slider.value}.</p>
                                `;

                                currentCountry = country;
                                btnCountry.classList.add('data__country--active');
                            }
                        }
                    });

                } else if (!dateCheckbox.checked) {
                    slider.classList.remove('data__slider--show');
                    sliderInput.disabled = true;

                    // let contentText = document.querySelector('.data__content');
                    // let probaArea = document.querySelector('.data__list');
                    // let currentCountry = null;

                    btnCountry.addEventListener('click', () => {
                        const countryFilter = data.ufo.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(country));
                        const countryResidentsFilter = data.country.filter(entry => entry.residents && entry.country.toLowerCase().includes(country));
        
                        unselectCountry();
        
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
                            mostFrequentCity = "Lieu inconnu";
                        }
            
            
                        let percentageCityGlobal = ((maxCountCity / countryFilter.length) * 100).toFixed(2);
                        let percentageCountryGlobal = ((countryFilter.length / data.ufo.length) * 100).toFixed(2);
                        let percentageResidentsByCountry = ((countryFilter.length / countryResidentsFilter[0].residents) * 1000).toFixed(4);
            
        
                        if (currentCountry === country) {
                            contentText.classList.remove('data__content--show');
                            probaArea.classList.remove('data__list--show');
                            btnCountry.classList.remove('data__country--active');
                            currentCountry = null;
                        } else {
                            contentText.classList.add('data__content--show');
                            probaArea.classList.add('data__list--show');

                            contentText.innerHTML = `
                                <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (1906 à 2021)</h2>
                            `;

                            probaArea.innerHTML = `
                                <li class="data__el"><span class="data__important">${countryFilter.length}</span><span>OVNI</span></li>
                                <li class="data__el"><span class="data__important">${maxCountCity}</span><span>${mostFrequentCity}</span></li>
                                <li class="data__el"><span class="data__important">${percentageCountryGlobal} %</span><span>% Europe</span></li>
                                <li class="data__el"><span class="data__important">${percentageResidentsByCountry} ‰</span><span>‰ chance</span></li>
                            `;
                            currentCountry = country;
                            btnCountry.classList.add('data__country--active');
                        }
                    });
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
            return;
            console.log(filteredData);
        };
        
        const slider = document.getElementById("range");
        const output = document.getElementById("date");
        output.innerHTML = slider.value;
        
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
        
        slider.addEventListener('input', displaySlider);
        slider.addEventListener('change', updateSlider);

        window.addEventListener('resize', displaySlider);
        
        renderData(updateData(slider.value));

    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));



function getCountryId(event) {
    let countryId = event.target.id;

    if (!countryId) {
        let parent = event.target.parentElement;
        if (parent && parent.id) {
            return parent.id;
        } else {
            return null;
        }
    } else {
        return countryId;
    }
}

let tooltip = document.getElementById('tooltip');
let countries = document.getElementsByClassName('data__tooltip');

for (let i = 0; i < countries.length; i++) {
    countries[i].addEventListener('mouseover', function(event) {
        tooltip.style.display = 'block';
        tooltip.innerHTML = `${getCountryId(event).translate().firstLetterCapitalize()}`;  
    });

    countries[i].addEventListener('mousemove', function(event) {
        updateTooltipPosition(event);
    });

    countries[i].addEventListener('mouseout', function(event) {
        tooltip.style.display = 'none';
    });
}

function updateTooltipPosition(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    tooltip.style.left = (mouseX + 15) + 'px';
    tooltip.style.top = (mouseY - 25) + 'px';
}


let funfacts = [
    "Il est beaucoup plus probable d'être frappé par la foudre un jour dans sa vie que de rencontrer un cas d'OVNI.",
    "Une personne moyenne en Europe a plus de probabilité de vivre jusqu'à 100 ans que de rencontrer un cas d'OVNI.",
    "Vous avez plus de probabilité de voir un OVNI que de vous faire attaquer par un requin.",
    "Il est plus probable de découvrir une nouvelle espèce animale ou végétale que de rencontrer un OVNI.",
    "Vous avez plus de probabilité de voir un OVNI que de vous faire percuter par un astéroïde.",
    "Il est plus probable de rencontrer un OVNI que de trouver une météorite."
];

let btnFunfact = document.querySelector('.funfact__btn');
let funfactArea = document.querySelector('.funfact__content');

let previousFunfact = -1;

btnFunfact.addEventListener('click', () => {
    let randomFunfact;

    do {
        randomFunfact = Math.floor(Math.random() * funfacts.length);
    } while (randomFunfact === previousFunfact)

    funfactArea.innerHTML = `
        <h3 class="funfact__title">Le saviez-vous ?</h3>
        <p class="funfact__text">${funfacts[randomFunfact]}</p>
    `;
    previousFunfact = randomFunfact;
});
