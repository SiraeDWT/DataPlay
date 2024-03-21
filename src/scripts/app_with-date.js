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


        const unselectCountry = () => {
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
                // console.log(dataByDate);
                

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
                    btnCountry.classList.remove('data__country--active');
                    currentCountry = null;
                } else {
                    contentText.classList.add('data__content--show');

                    if (dataByDate.length > 0) {
                        contentText.innerHTML = `
                            <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (${slider.value})</h2>
                            <p class="data__text text">${dataByDate.length} cas d'OVNI recensés en ${country.translate().firstLetterCapitalize()} sur ${dateFilter.length} cas recensés en Europe en ${slider.value}.</p>
                            <p class="data__text text">${maxCountCity} cas à ${mostFrequentCity} sur ${dataByDate.length} en ${country.translate().firstLetterCapitalize()}, cela représente ${percentageCity} % des cas du pays en ${slider.value}.</p>
                            <p class="data__text text">${percentageCountry} % des cas en Europe ont eu lieu en ${country.translate().firstLetterCapitalize()} en ${slider.value}.</p>
                        `;

                        currentCountry = country;
                        btnCountry.classList.add('data__country--active');
                    } else {
                        contentText.innerHTML = `
                            <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (${slider.value})</h2>
                            <p class="data__text text">Il n'y a eu aucun cas d'OVNI recensés en ${country.translate().firstLetterCapitalize()} en ${slider.value}.</p>
                        `;
                        currentCountry = country;
                        btnCountry.classList.add('data__country--active');
                    }
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
        
        slider.addEventListener('input', displaySlider);
        slider.addEventListener('change', updateSlider);

        window.addEventListener('resize', displaySlider);
        
        renderData(updateData(slider.value));

    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));





// Tooltip
function getCountryId(event) {
    // Si pas d'ID dans polygon, prendre l'ID du parent au-dessus du g
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





// Select tri
const selectElement = document.getElementById('select-data');

selectElement.addEventListener('change', function() {
    let slider = document.querySelector('.data__slider');
    const selectedValue = selectElement.value;

    if (selectedValue === 'dates') {
        slider.classList.add('data__slider--show');
    } else if (selectedValue === 'shapes') {
        slider.classList.remove('data__slider--show');
    } else{
        slider.classList.remove('data__slider--show');
    }
});




// SI j'ai la valeur du select qui est "nothing", on garde les datas globales;
// SI j'ai la valeur du select qui est "dates", on affiche les datas en fonction de la date sélectionnée;
// SI j'ai la valeur du select qui est "shapes", on affiche les datas en fonction de la forme sélectionnée;