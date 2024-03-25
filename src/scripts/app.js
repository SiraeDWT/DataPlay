"use strict";

import { gsap } from "gsap";

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
    'sweden': 'suède',

    'chevron': 'chevron',
    'cigar': 'cigare',
    'circle': 'cercle',
    'cone': 'cone',
    'cross': 'croix',
    'cylinder': 'cylindre',
    'diamond': 'diamant',
    'disk': 'disque',
    'fireball': 'boule de feu',
    'flash': 'flash lumineux',
    'formation': 'formation',
    'light': 'lumière',
    'other': 'autre',
    'oval': 'ovale',
    'rectangle': 'rectangle',
    'teardrop': 'goutte',
    'triangle': 'triangle',
    'egg': 'oeuf',
};


// function eventChangeOnload() {
//     // Simuler le premier check pour ne pas devoir attendre le change event
//     let dateCheckbox = document.getElementById("date-checkbox");
//     dateCheckbox.checked = false;

//     let changeEvent = new Event('change');
//     dateCheckbox.dispatchEvent(changeEvent);
// }

// window.addEventListener('load', function() {
//     eventChangeOnload();
// });

let contentText = document.querySelector('.data__content');
let probaArea = document.querySelector('.data__list');

contentText.innerHTML = `
    <h2 class="data__title text">Europe (1906 à 2021)</h2>
`;

probaArea.innerHTML = `
    <li class="data__el"><span class="data__important">1539</span><span>OVNI</span></li>
`;


let beginBtn = document.getElementById('begin-btn');
let backBtn = document.getElementById('back-btn');
let presentationSection = document.querySelector('.presentation');
let appSection = document.querySelector('.data');
let database;

beginBtn.addEventListener('click', () => {
    presentationSection.classList.add('presentation--hide');
    appSection.classList.add('data--show');
});

backBtn.addEventListener('click', () => {
    presentationSection.classList.remove('presentation--hide');
    appSection.classList.remove('data--show');
});


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
        displayData();
    });
});


const countriesBtn = document.querySelectorAll('.data__country');
countriesBtn.forEach(button => {
    button.addEventListener('click', function(e) {
        
        let activeButton = document.querySelector(".data__country--active");
        button.classList.add("data__country--active");

        if(activeButton){
            activeButton.classList.remove("data__country--active");
        }

        displayData();
    });
});


const dateCheckbox = document.getElementById('date-checkbox');
const dateRange = document.getElementById("range");
const dateOutput = document.getElementById("date");
const dateSlider = document.querySelector('.data__slider');
dateCheckbox.addEventListener('change', function() {
    if (dateCheckbox.checked) {
        dateSlider.classList.add('data__slider--show');
        dateRange.disabled = false;
    }else{
        dateSlider.classList.remove('data__slider--show');
        dateRange.disabled = true;
    }
    displayData();
});


dateOutput.innerHTML = dateRange.value;
const updateSlider = () => {
    const sliderPosition = (dateRange.value - dateRange.min) / (dateRange.max - dateRange.min);
    const sliderWidth = dateRange.getBoundingClientRect().width;
    const newPosition = (sliderWidth * sliderPosition) - (dateOutput.offsetWidth / 2);
    dateOutput.style.left = newPosition + 'px';
    displayData();
};

const displaySlider = () => {
    dateOutput.innerHTML = dateRange.value;
    const sliderPosition = (dateRange.value - dateRange.min) / (dateRange.max - dateRange.min);
    const sliderWidth = dateRange.getBoundingClientRect().width;
    const newPosition = (sliderWidth * sliderPosition) - (dateOutput.offsetWidth / 2);
    dateOutput.style.left = newPosition + 'px';
};

dateRange.addEventListener('input', displaySlider);
dateRange.addEventListener('change', updateSlider);
window.addEventListener('resize', displaySlider);


const ufoUrl = 'assets/data/ufo_data_final.json';

fetch(ufoUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        database = data;

        let countries = [];
        for (let i = 0; i < data.country.length; i++) {
            if (data.country === "czech republic") {
                countries.push('czech-republic')
            } else {
                countries.push(data.country[i].country);
            }  
        }

        let shapesSet = new Set();
        for (let i = 0; i < data.ufo.length; i++) {
            let shape = data.ufo[i].shape;
            if (shape && !["changing", "unknown", "", "orb", "sphere"].includes(shape.toLowerCase())) { // Exclure changing, unknown, empty, orb and sphere
                shapesSet.add(shape.toLowerCase());
            }
        }
        let shapes = Array.from(shapesSet); // shapes contient toutes les formes: (18) ['circle', 'light', 'formation', 'oval', 'disk', 'other', 'triangle', 'diamond', 'cigar', 'fireball', 'cylinder', 'rectangle', 'cone', 'flash', 'teardrop', 'egg', 'chevron', 'cross']

    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));


// Tooltip
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

function getShapeId(event) {
    let shapeId = event.target.id;

    if (!shapeId) {
        let parent = event.target.parentElement;
        if (parent && parent.id) {
            return parent.id;
        } else {
            return null;
        }
    } else {
        return shapeId;
    }
}

let shapes = document.querySelectorAll('.shapes__btn');

for (let i = 0; i < shapes.length; i++) {
    shapes[i].addEventListener('mouseover', function(event) {
        tooltip.style.display = 'block';
        tooltip.innerHTML = `${getShapeId(event).translate().firstLetterCapitalize()}`;  
    });

    shapes[i].addEventListener('mousemove', function(event) {
        updateTooltipPosition(event);
    });

    shapes[i].addEventListener('mouseout', function(event) {
        tooltip.style.display = 'none';
    });
}

function updateTooltipPosition(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    tooltip.style.left = (mouseX + 15) + 'px';
    tooltip.style.top = (mouseY - 25) + 'px';
}


function unselectCountry(){
    const activeButton = document.querySelector('.data__country.data__country--active');
    if (activeButton) {
        activeButton.classList.remove('data__country--active');
    }
}



function displayData(){

    if(database.length == 0) return;

    // current year
    let currentYear;
    if(document.getElementById("date-checkbox").checked){
        currentYear = document.getElementById("range").value;
    }

    // active country
    let activeCountry;
    let activeCountryElement = document.querySelector('.data__country.data__country--active');
    if(activeCountryElement){
        activeCountry = activeCountryElement.id;
    }
    
    // active shapes
    let activeShape;
    let activeShapeElement = document.querySelector('.shapes__btn--active');
    if(activeShapeElement){
        activeShape = activeShapeElement.id;
    }

    console.log(currentYear, activeCountry, activeShape);

    let filteredUfoData = [...database.ufo];
    if(activeCountry){
        filteredUfoData = filteredUfoData.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(activeCountry));
    }


    if(activeShape){
        filteredUfoData = filteredUfoData.filter(entry => entry.shape && entry.shape.toLowerCase().includes(activeShape));
    }


    if(currentYear){
        filteredUfoData = filteredUfoData.filter(entry => {
            return entry.momentEvent.dateTimeEvent.split('/')[2] == currentYear;
        });


        contentText.innerHTML = `
            <h2 class="data__title text">${activeCountry.translate().firstLetterCapitalize()} (${currentYear})</h2>
        `;

        probaArea.innerHTML = `
            <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI</span></li>
        `;
    }

    console.log(filteredUfoData);

    // TODO: display all the data here :D 
}



// MAP
let scale = 1;
let panning = false;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let zoom = document.querySelector("#svg-map");

function setTransform() {
    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    zoom.style.transform = "0px 0px";
}

zoom.addEventListener('mousedown', function (e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    zoom.style.transition = "0s";
})

zoom.addEventListener('mouseup', function (e) {
    panning = false;
    zoom.style.transition = "0s";
})

zoom.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    zoom.style.transition = "0s";
    
    setTransform();
})

zoom.addEventListener('wheel', function (e) {
    e.preventDefault();
    let xs = (e.clientX - pointX) / scale;
    let ys = (e.clientY - pointY) / scale;
    let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    zoom.style.transition = "0s";

    setTransform();
})



let btnReposition = document.querySelector('#btn-center');
let btnPlus = document.querySelector('#btn-plus');
let btnMoins = document.querySelector('#btn-minus');
let zoomPos = 1;
let i = 0.2;


btnReposition.addEventListener('click', reposition);

function reposition() {
    scale = 1;
    zoomPos = 1;

    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    zoom.style.transition = "0.5s";
}


btnPlus.addEventListener('click', zoomIn);

function zoomIn(){
    let scale = zoomPos + i;

    zoom.style.transform = "scale(" + scale + ")";
    zoom.style.transition = "0.5s";

    zoomPos = zoomPos + i;
}


btnMoins.addEventListener('click', zoomOut);

function zoomOut(){
    let scale = zoomPos - i;

    zoom.style.transform = "scale(" + scale + ")";
    zoom.style.transition = "0.5s";

    zoomPos = zoomPos - i;
}
