"use strict";

console.info('%cLes données qui suivent sont des tests de récupération de données qui nous serviront plus tard dans le projet.', 'color: black; background: yellow; font-size: 17px');

const ufoUrl = '../assets/data/ufo_data_final.json';

fetch(ufoUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(`${data.length} cas d'ovnis recensés en Europe.\n---`);

        const shapeFilter = ['Light', 'Circle', 'Cube', 'Egg', 'Triangle', 'Chevron', 'Cigar', 'Sphere', 'Orb', 'Cone', 'Cross', 'Cylinder', 'Diamond', 'Disk', 'Fireball', 'Flash', 'Formation', 'Oval', 'Rectangle', 'Star', 'Teadrop'];

        shapeFilter.forEach(shapeFilterEl => {
            const resultShapeFilter = data.filter(entry => entry.shape && entry.shape.includes(shapeFilterEl));

            console.log(`${resultShapeFilter.length} cas d'OVNI recensés en forme de ${shapeFilterEl} en Europe.`);
            // console.log(resultShapeFilter);
        })
        
    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));





const countryUrl = '../assets/data/country_data.json';

fetch(countryUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let countries = ['austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czechRepublic', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta', 'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain', 'sweden'];

        let totalResidents = 0;

        for (let i = 0; i < countries.length; i++) {
            let countryData = data.find(item => Object.keys(item)[0] === countries[i]);
            
            if (countryData) {
                let residents = countryData[countries[i]].residents;
                totalResidents += residents;
                // console.log(`${countries[i]} a ${residents} résidents.`);
            }
        }

        console.log(`Il y a en tout ${totalResidents} personnes sur ${data.length} pays d'Europe`);
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



// ----- SLIDER -----


import { gsap } from "gsap";

// slider fleche de droite 
const sliderRight = document.querySelector('.slider__right');

sliderRight.addEventListener('click', rightRotation);

var currentPos = 0;

function rightRotation() {
    let i = -18.947;

    let thisRotation = currentPos + i + 'deg';

    gsap.to('.slider__list', {rotateY: thisRotation, duration: 0.1, ease: 'power3.in'} );

    currentPos = currentPos + i;
}

// slider fleche de gauche
const sliderLeft = document.querySelector('.slider__left');

sliderLeft.addEventListener('click', leftRotation);

var currentPos = 0;

function leftRotation() {
    let i = 18.947;

    let thisRotation = currentPos + i + 'deg';

    gsap.to('.slider__list', {rotateY: thisRotation, duration: 0.1, ease: 'power3.in'} );

    currentPos = currentPos + i;
}


// canvas
// console.clear();

// Get the canvas element from the DOM
const canvas = document.querySelector('#scene');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
// Store the 2D context
const ctx = canvas.getContext('2d');

if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  ctx.scale(2, 2);
}

/* ====================== */
/* ====== VARIABLES ===== */
/* ====================== */
let width = canvas.clientWidth; // Width of the canvas
let height = canvas.clientHeight; // Height of the canvas
let rotation = 0; // Rotation of the globe
let dots = []; // Every dots in an array

/* ====================== */
/* ====== CONSTANTS ===== */
/* ====================== */
/* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
const DOTS_AMOUNT = 1000; // Amount of dots on the screen
const DOT_RADIUS = 4; // Radius of the dots
let GLOBE_RADIUS = width * 0.7; // Radius of the globe
let GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
let FIELD_OF_VIEW = width * 0.8;

class Dot {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.xProject = 0;
    this.yProject = 0;
    this.sizeProjection = 0;
  }
  // Do some math to project the 3D position into the 2D canvas
  project(sin, cos) {
    const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
    const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
    this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
    this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
    this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
  }
  // Draw the dot on the canvas
  draw(sin, cos) {
    this.project(sin, cos);
    // ctx.fillRect(this.xProject - DOT_RADIUS, this.yProject - DOT_RADIUS, DOT_RADIUS * 2 * this.sizeProjection, DOT_RADIUS * 2 * this.sizeProjection);
    ctx.beginPath();
    ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function createDots() {
  // Empty the array of dots
  dots.length = 0;
  
  // Create a new dot based on the amount needed
  for (let i = 0; i < DOTS_AMOUNT; i++) {
    const theta = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
    const phi = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
    
    // Calculate the [x, y, z] coordinates of the dot along the globe
    const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
    const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
    const z = (GLOBE_RADIUS * Math.cos(phi)) + GLOBE_CENTER_Z;
    dots.push(new Dot(x, y, z));
  }
}

/* ====================== */
/* ======== RENDER ====== */
/* ====================== */
function render(a) {
  // Clear the scene
  ctx.clearRect(0, 0, width, height);
  
  // Increase the globe rotation
  rotation = a * 0.0004;
  
  const sineRotation = Math.sin(rotation); // Sine of the rotation
  const cosineRotation = Math.cos(rotation); // Cosine of the rotation
  
  // Loop through the dots array and draw every dot
  for (var i = 0; i < dots.length; i++) {
    dots[i].draw(sineRotation, cosineRotation);
  }
  
  window.requestAnimationFrame(render);
}


// Function called after the user resized its screen
function afterResize () {
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  GLOBE_RADIUS = width * 0.7;
  GLOBE_CENTER_Z = -GLOBE_RADIUS;
  PROJECTION_CENTER_X = width / 2;
  PROJECTION_CENTER_Y = height / 2;
  FIELD_OF_VIEW = width * 0.8;
  
  createDots(); // Reset all dots
}

// Variable used to store a timeout when user resized its screen
let resizeTimeout;
// Function called right after user resized its screen
function onResize () {
  // Clear the timeout variable
  resizeTimeout = window.clearTimeout(resizeTimeout);
  // Store a new timeout to avoid calling afterResize for every resize event
  resizeTimeout = window.setTimeout(afterResize, 500);
}
window.addEventListener('resize', onResize);

// Populate the dots array with random dots
createDots();

// Render the scene
window.requestAnimationFrame(render);
