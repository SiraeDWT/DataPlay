"use strict";

const url = '../assets/data/ufo_data.json';

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaidjan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
        const countryFilter = data.filter(entry => entry.city && countries.some(country => entry.city.includes(country)));

        console.log(`${countryFilter.length} cas d'OVNI recensés sur ${countries.length} pays d'Europe.`);
        console.log(countryFilter);
    })
    .catch(error => console.error(`Une erreur s'est produite lors de la récupération du fichier JSON: ${error}`));
