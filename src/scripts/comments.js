// shapes.forEach(shape => {
        //     // TRI PAR FORME - Au click, renvoie tous les cas sur base du shape sélectionné
        //     let btnShape = document.getElementById(shape);

        //     btnShape.addEventListener('click', () => {
        //         const shapeFilter = data.ufo.filter(entry => entry.shape && entry.shape.toLowerCase().includes(shape));

        //         if (btnShape.classList.contains('shapes__btn--active')){
        //             console.log(shapeFilter);
        //         } else{
        //             console.log('ferme');
        //         }
        //     });
        // });

       /*
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
                            // checkpoint
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
                                    <p class="data__text text">Il n'y a eu aucun cas d'OVNI recensés en ${country.translate().firstLetterCapitalize()} en ${slider.value} sur ${dateFilter.length} cas en Europe.</p>
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
                            console.log('test'); // ici
                            currentCountry = null;
                        } else {




                            

                            shapes.forEach(shape => {
                                // TRI PAR FORME - Au click, renvoie tous les cas sur base du shape sélectionné
                                let btnShape = document.getElementById(shape);

                                btnShape.addEventListener('click', () => {
                                    const shapeFilter = data.ufo.filter(entry => entry.shape && entry.shape.toLowerCase().includes(shape));
                                    const shapeFilterByCountry = data.ufo.filter(entry => entry.shape && entry.shape.toLowerCase().includes(shape) && entry.location.country && entry.location.country.toLowerCase().includes(country));

                                    if (btnShape.classList.contains('shapes__btn--active')){
                                        let countByShape = shapeFilterByCountry.length;
                                        console.log(`${countByShape} ${shapeFilter[0].shape.translate().firstLetterCapitalize()}`);


                                        let percentageShapeByCountry = ((countByShape / countryFilter.length) * 100).toFixed(2);

                                        contentText.classList.add('data__content--show');
                                        probaArea.classList.add('data__list--show');

                                        contentText.innerHTML = `
                                            <h2 class="data__title text">${country.translate().firstLetterCapitalize()} (${shapeFilter[0].shape.translate().firstLetterCapitalize()})</h2>
                                        `;

                                        probaArea.innerHTML = `
                                            <li class="data__el"><span class="data__important">${countByShape}</span><span>${shapeFilter[0].shape.translate().firstLetterCapitalize()}</span></li>
                                            <li class="data__el"><span class="data__important">${percentageShapeByCountry} %</span><span>${shapeFilter[0].shape.translate().firstLetterCapitalize()}/${country.translate().firstLetterCapitalize()}</span></li>
                                            <li class="data__el"><span class="data__important">${countryFilter.length}</span><span>${country.translate().firstLetterCapitalize()}</span></li>
                                            <li class="data__el"><span class="data__important">${percentageCountryGlobal} %</span><span>% Europe</span></li>
                                        `;
                                    } else{
                                        console.log('ferme le tri par shape');


                                        contentText.classList.add('data__content--show');
                                        probaArea.classList.add('data__list--show');

                                        contentText.innerHTML = `
                                            <h2 class="data__title text">${country.translate().firstLetterCapitalize()}</h2>
                                        `;

                                        probaArea.innerHTML = `
                                            <li class="data__el"><span class="data__important">${countryFilter.length}</span><span>OVNI</span></li>
                                            <li class="data__el"><span class="data__important">${maxCountCity}</span><span>${mostFrequentCity}</span></li>
                                            <li class="data__el"><span class="data__important">${percentageCountryGlobal} %</span><span>% Europe</span></li>
                                            <li class="data__el"><span class="data__important">${percentageResidentsByCountry} ‰</span><span>‰ chance</span></li>
                                        `;
                                    }
                                });
                            });
                            









                            contentText.classList.add('data__content--show');
                            probaArea.classList.add('data__list--show');

                            contentText.innerHTML = `
                                <h2 class="data__title text">${country.translate().firstLetterCapitalize()}</h2>
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
        */




                // const updateData = (year) => {
        //     const filteredData = data.ufo.filter(entry => {
        //         let fullYear = entry.momentEvent.dateTimeEvent.slice(-4);
        //         return fullYear == year;
        //     });
        //     return filteredData;
        // };
        
        // const renderData = (filteredData) => {
        //     return;
        //     console.log(filteredData);
        // };