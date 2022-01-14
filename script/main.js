const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const GET_ALL_COCKTAILS = API + 'filter.php?c=Cocktail';
const GET_COCKTAILS_BY_NAME = API + 'search.php?s='
const FILTER_COCKTAIL_BY_ALCOHOLIC = API + 'filter.php?a='
const COCTAIL_DETAILS_BY_ID = API + 'lookup.php?i='
const GET_INFO_BY_INGREDIENT = API + 'search.php?i='


let form, input, output, select;
form = document.getElementById('form');
input = document.getElementById('input');
output = document.getElementById('output');
select = document.getElementById('select');

const getAllCocktails = async () => {
    const request = await fetch(GET_ALL_COCKTAILS);
    const response = await request.json();
    renderCocktails(response.drinks);
};

const getCocktailsByName = async (name) => {
    let request = ''
    if (name.length >= 2) {
        request = await fetch(GET_COCKTAILS_BY_NAME + name);
    } else {
        request = await fetch(GET_ALL_COCKTAILS);
    }

    const response = await request.json();
    renderCocktails(response.drinks);
};



const filterCocktailByAlcoholic = async (option) => {
    const request = await fetch(FILTER_COCKTAIL_BY_ALCOHOLIC + option);
    const response = await request.json();
    renderCocktails(response.drinks);
};


const getCoctailDetailsById = async (id) => {
    const request = await fetch(COCTAIL_DETAILS_BY_ID + id);
    const response = await request.json();
    renderCoctailDetails(response.drinks[0]);
};

const renderCoctailDetails = (cocktail) => {
    output.innerHTML = ''
    const card = document.createElement('div');
    card.innerHTML = `
    <h2>${cocktail.strDrink}</h2>
    <img src="${cocktail.strDrinkThumb}"/>
    <p>${cocktail.strInstructions}</p>
    `
        ;

    for (let key in cocktail) {
        if (key.includes('strIngredient') && cocktail[key] != null) {
            let ingr = document.createElement('li');
            ingr.textContent = cocktail[key]
            card.append(ingr);

            ingr.addEventListener('click', () => {
                getInfobYIngredient(cocktail[key]);
            })
        }
    }

    output.append(card)
}

const getInfobYIngredient = async (name) => {
    const request = await fetch(GET_INFO_BY_INGREDIENT + name);
    const response = await request.json();
    renderIngredient(response.ingredients[0]);
};

const renderIngredient = (ingredient) => {
    output.innerHTML = '';
    const card = document.createElement('div');
    card.innerHTML = `
    <h2>${ingredient.strIngredient}</h2>
    <h4>${ingredient.strAlcohol}</h4>
    <p>${ingredient.strDescription}</p>
    `
        ;
    output.append(card)
}


const renderCocktails = (response) => {
    output.innerHTML = ''
    response ?
        response.map((element) => {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h2');

            img.src = element.strDrinkThumb;
            title.innerHTML = element.strDrink;

            card.append(title, img);
            output.append(card);

            card.addEventListener('click', () => {
                getCoctailDetailsById(element.idDrink);

            });
        })
        :
        'Error';
};



getAllCocktails();


form.addEventListener('submit', (event) => {
    event.preventDefault()
    getCocktailsByName(input.value)
});


input.addEventListener('keydown', () => getCocktailsByName(input.value));
select.addEventListener('change', (event) => filterCocktailByAlcoholic(event.target.value));








