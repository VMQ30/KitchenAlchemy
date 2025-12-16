import { getAllRecipe } from "./recipe.js"

(function(){
    flipCard()
    loadTrendingRecipe()
    populateTrendingRecipes()
})()

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
    const cards = document.querySelectorAll('.trending-card')
    cards.forEach((card , index) => {
        const recipeName = card.querySelector('h4')
        recipeName.textContent = 'hi'
    })
}

