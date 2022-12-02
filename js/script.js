const btn = document.querySelector('#input-btn');
const infoDiv = document.querySelector('#info-div');
btn.addEventListener('click', getInput);

function getInput(event) {
    event.preventDefault();

    const input = document.querySelector('#input-lang');
    const inputLang = input.value;
    input.value = '';

    fetchLang(inputLang);
}

function fetchLang(language) {
    const url = `https://restcountries.com/v3.1/lang/${language}`;

    fetch(url)
        .then(response => {
            console.log(response.ok);
            if (response.ok)
                return response.json()
            else
                throw 'something went wrong :('
        })
        .then(getInfo)
        .catch(error => {
            infoDiv.innerHTML = ''
            const errorMessage = document.createElement('p');
            infoDiv.appendChild(errorMessage);
            errorMessage.innerText = error;
        })
}

function getInfo(languageData) {
    console.log(languageData);
    infoDiv.innerHTML = '';

    const biggestPopulation = new Array();

    for (let i = 0; i < languageData.length; i++) {

        const div = document.createElement('div');
        infoDiv.appendChild(div);

        const name = document.createElement('h1');
        div.appendChild(name);
        name.innerText = languageData[i].name.official;

        const subregion = document.createElement('h3');
        div.appendChild(subregion);
        subregion.innerText = languageData[i].subregion;

        const capital = document.createElement('h3');
        div.appendChild(capital);
        capital.innerText = `capital: ${languageData[i].capital}`;

        const population = document.createElement('h4');
        div.appendChild(population);
        population.innerText = `population: ${languageData[i].population}`;
        biggestPopulation.push(languageData[i].population);

        const flag = document.createElement('img');
        div.appendChild(flag);
        flag.src = languageData[i].flags.png;
    }

    console.log(biggestPopulation)
    const max = Math.max(...biggestPopulation);
    const index = biggestPopulation.indexOf(max);
    console.log(max);
    console.log(index);

    document.querySelectorAll('div')[index + 1].style.border = '2px solid red';
}