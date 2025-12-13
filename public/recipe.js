
const API_ID = '129c5309'
const API_KEY = '2d9ce52b282a3e8ac527dc323f2f3b60'
const USER_ID = 'VMQ30'

async function getRecipe( url ){
    try{
        const response = await fetch( url , {
            headers : {
                'Edamam-Account-User': USER_ID
            }
        })
        const data = await response.json()
        return data.hits
    }
    catch( error ){
        console.log(error)
        return []
    }
}

async function getRecipeByDietLabel( query ){
    const url = `https://api.edamam.com/api/recipes/v2?type=public&diet=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    const recipeList = await getRecipe(url)
    return recipeList
}

async function getRecipeByHealth( query ){
    const url = `https://api.edamam.com/api/recipes/v2?type=public&health=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    const recipeList = await getRecipe(url)
    return recipeList
}

async function getRecipeByCuisineType( query ){
    const url = `https://api.edamam.com/api/recipes/v2?type=public&cuisineType=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    const recipeList = await getRecipe(url)
    return recipeList
}

async function getGeneralRecipe( query ){
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    const recipeList = await getRecipe( url )
    return recipeList
}

async function getAllRecipe(){
    const allRecipes = []
//    const keywords = [ 'chicken' , 'beef' , 'pork' , 'dessert' , 'vegetable' , 'bread' , 'egg' , 'soup' , 'salad' , 'fish' ]
    const keywords = [ 'chicken' , 'beef' , 'pork' , 'dessert' , 'vegetable' ]

    for (const keyword of keywords) {
        const recipePage = await getGeneralRecipe(keyword)
        allRecipes.push(...recipePage)
    }

    console.log(allRecipes)

    return allRecipes
    // allRecipes.forEach((recipe) => {
    //     console.log(recipe.recipe.label)
    // })

}

