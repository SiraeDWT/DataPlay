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


let contentText = document.querySelector('.data__content');
let probaArea = document.querySelector('.data__list');

contentText.innerHTML = `
    <h2 class="data__title text">Union européenne</h2>
`;

probaArea.innerHTML = `
    <li class="data__el"><span class="data__important">1539</span><span>OVNI</span></li>
    <li class="data__el"><span class="data__important">27</span><span>Pays</span></li>
    <li class="data__el"><span class="data__important">18</span><span>Formes</span></li>
    <li class="data__el"><span class="data__important">115</span><span>Années</span></li> 
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
        resetShapesButtons();
    }
    displayData();
});


function resetShapesButtons() {
    const shapesBtns = document.querySelectorAll('.shapes__btn');
    shapesBtns.forEach(btn => {
        btn.removeAttribute('disabled');
        btn.style.opacity = '1';
    });
}


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

dateRange.addEventListener('input', updateSlider);
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

    contentText.innerHTML = `
        <h2 class="data__title text">Union européenne</h2>
    `;

    probaArea.innerHTML = `
        <li class="data__el"><span class="data__important">1539</span><span>OVNI</span></li>
        <li class="data__el"><span class="data__important">27</span><span>Pays</span></li>
        <li class="data__el"><span class="data__important">18</span><span>Formes</span></li>
        <li class="data__el"><span class="data__important">115</span><span>Années</span></li> 
    `;

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

    // console.log(currentYear, activeCountry, activeShape);

    let filteredUfoData = [...database.ufo];

    let totalCountUfo = filteredUfoData.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(activeCountry));


    if(activeCountry){ // Quand on clique sur un pays
        filteredUfoData = filteredUfoData.filter(entry => entry.location.country && entry.location.country.toLowerCase().includes(activeCountry));

        let counts = {};

        for (let i = 0; i < filteredUfoData.length; i++) {
            let city = filteredUfoData[i].location.city;
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

        let percentageEuropeByCountry = ((filteredUfoData.length / database.ufo.length) * 100).toFixed(2);

        contentText.innerHTML = `
            <h2 class="data__title text">${activeCountry.translate().firstLetterCapitalize()}</h2>
        `;

        probaArea.innerHTML = `
            <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI</span></li>
            <li class="data__el"><span class="data__important">${percentageEuropeByCountry} %</span><span>% Europe</span></li>
            <li class="data__el"><span class="data__important">${maxCountCity}</span><span>${mostFrequentCity}</span></li>
        `;
    }
    

    if(activeShape){ // Quand on clique sur une forme
        filteredUfoData = filteredUfoData.filter(entry => entry.shape && entry.shape.toLowerCase().includes(activeShape));
        

        let percentageShapeByCountry = ((filteredUfoData.length / totalCountUfo.length) * 100).toFixed(2);

        if(activeCountry) {
            contentText.innerHTML = `
                <h2 class="data__title text">${activeCountry.translate().firstLetterCapitalize()} (${activeShape.translate()})</h2>
            `;

            probaArea.innerHTML = `
                <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI ${activeShape.translate()}</span></li>
                <li class="data__el"><span class="data__important">${percentageShapeByCountry} %</span><span>${activeShape.translate().firstLetterCapitalize()}/${activeCountry.translate().firstLetterCapitalize()}</span></li>
                <li class="data__el"><span class="data__important">${totalCountUfo.length}</span><span>OVNI ${activeCountry.translate().firstLetterCapitalize()}</span></li>
            `;
        } else {
            contentText.innerHTML = `
                <h2 class="data__title text">${activeShape.translate().firstLetterCapitalize()}</h2>
            `;

            probaArea.innerHTML = `
                <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI</span></li>
            `;
        }
        
    }


    if(currentYear){ // Quand on clique sur une année
        filteredUfoData = filteredUfoData.filter(entry => {
            return entry.momentEvent.dateTimeEvent.split('/')[2] == currentYear;
        });

        dateOutput.innerHTML = `${currentYear}`;


        if(activeCountry) {
            contentText.innerHTML = `
                <h2 class="data__title text">${activeCountry.translate().firstLetterCapitalize()} (${currentYear})</h2>
            `;

            probaArea.innerHTML = `
                <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI</span></li>
            `;
        } else {
            contentText.innerHTML = `
                <h2 class="data__title text">En ${currentYear}</h2>
            `;

            probaArea.innerHTML = `
                <li class="data__el"><span class="data__important">${filteredUfoData.length}</span><span>OVNI</span></li>
            `;
        }
        
    }


    //Griser les boutons de sélection des formes s'il n'y a pas de formes après le tri
    let availableShapes = getAvailableShapes(activeCountry, currentYear);
    const shapesBtns = document.querySelectorAll('.shapes__btn');
    // console.log(availableShapes);
    for(let shapesBtn of shapesBtns){
        // console.log(shapesBtn.id);
        if(availableShapes.includes(shapesBtn.id)){
            shapesBtn.removeAttribute('disabled');
            shapesBtn.style.opacity = "1";
        }else{
            shapesBtn.setAttribute('disabled', 'disabled');
            shapesBtn.style.opacity = "0.2";
        }
    }
}

function getAvailableShapes(activeCountry, currentYear){
    
    let filteredUfoData = [...database.ufo];

    if(activeCountry){
        filteredUfoData = filteredUfoData.filter(entry => {
            return entry.location.country && entry.location.country.toLowerCase().includes(activeCountry);
        });
    }
    
    if(currentYear){
        filteredUfoData = filteredUfoData.filter(entry => {
            return entry.momentEvent.dateTimeEvent.split('/')[2] == currentYear;
        });
    }
    
    let buffer = [];
    for(let entry of filteredUfoData){
        let shapeName = entry.shape.toLowerCase();
        if(!buffer.includes(shapeName)){
            buffer.push(shapeName);
        }
    }
    return buffer;
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






function spanFranz() {
    const herrUption = document.querySelector('.herr-uption');

    const numberOfSpans = 150;
    
    for (let i = 0; i < numberOfSpans; i++) {
        const span = document.createElement('span');
        herrUption.appendChild(span);
    }
}


document.querySelector('.btn-franz').addEventListener('click', function() {
    spanFranz();
    let herrUptionSpans = document.querySelectorAll('.herr-uption > span');
    herrUptionSpans.forEach(function(span) {
        span.classList.toggle('animation');
    });
});