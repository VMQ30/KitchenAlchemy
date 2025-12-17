import { getAllRecipe } from "./recipe.js"

(function(){
    flipCard()
    loadTrendingRecipe()
    populateTrendingRecipes()
})()

function toTitleCaseArray(str) {
    if(!str) return 'N/A'
    return str
        .map(word =>
            word
            .toLowerCase()
            .split(/[\s\/]+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
        )
        .join(', ')
}

function toTitleCase(str) {
    if(!str) return 'N/A'

    return str
        .toLowerCase()
        .split(/[\s\/]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function toTitleCaseOneWord(str) {
    if(!str) return 'N/A'
    const firstWord = str.toLowerCase().split(' ')[0]
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

function flipCard(){
    const cards = document.querySelectorAll('.trending-card')
    cards.forEach((card) => {
        card.addEventListener('click' , () => {
            const wrapper = card.firstElementChild
            if(wrapper){
                wrapper.classList.toggle('flip-card')
            }
        })
    })
}

async function loadTrendingRecipe(){
    const keyword = [ 'chicken' , 'vegetable' , 'cheese' , 'chocolate' ]
    const recipes = await getAllRecipe(keyword);

    const trendingRecipe = [];
    
    for(let i = 0 ; i < recipes.length ; i += 20) {
        trendingRecipe.push(recipes[i] , recipes[i + 1] )
    }

    console.log(trendingRecipe)

    return trendingRecipe
}

async function populateTrendingRecipes(){
    const trendingRecipe = await loadTrendingRecipe()

    const cards = document.querySelectorAll('.trending-card')
    cards.forEach((card , index) => {
        //front card
        const recipeName = card.querySelector('h4')
        const recipeDishType = card.querySelector('.recipe-dish')
        const recipeCalories = card.querySelector('.recipe-calories')
        const recipePic = card.querySelector('.trending-picture')

        let currentRecipe = trendingRecipe[index].recipe

        recipeName.textContent = currentRecipe.label
        recipeDishType.textContent = toTitleCaseOneWord(currentRecipe.dishType[0])
        recipeCalories.textContent = `${currentRecipe.calories.toFixed(2)} cal`
        recipePic.style.backgroundImage = `url("${currentRecipe.images.REGULAR.url}")`

        //back card
        const recipeNameBack = card.querySelector('h6')
        const recipeMealType = card.querySelector('.meal-type')
        const recipeCuisineType = card.querySelector('.cuisine-type')
        const recipeHealthLabels = card.querySelector('.health-labels')

        recipeNameBack.textContent = currentRecipe.label
        recipeMealType.textContent = `Meal Type: ${toTitleCase(currentRecipe.mealType[0])}`
        recipeCuisineType.textContent = `Cuisine Type: ${toTitleCaseArray(currentRecipe.cuisineType)}`
    recipeHealthLabels.textContent = `Health Labels: ${toTitleCaseArray(currentRecipe.healthLabels.slice(1, 6))}`

    })
}

