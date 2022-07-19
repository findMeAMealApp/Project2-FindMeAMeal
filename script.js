// Find Me A Meal App

// Global Variables
const search = document.getElementById('search'),
     random = document.getElementById('random'),
     submit = document.getElementById('submit'),
     mealsEl = document.getElementById('meals'),
     resultHeadingEl = document.getElementById('result-heading'),
     singleMealEL = document.getElementById('single-meal')

const mealApp = {}

mealApp.url = 'https://www.themealdb.com/api/json/v1/1/search.php'

mealApp.init = function () {
     submit.addEventListener('submit', mealApp.searchMeal)
     random.addEventListener('click', mealApp.searchRandomMeal)
}

mealApp.displaySingleMeal = function (mealObject) {
     console.log(mealObject)

     //since this will be a single meal, therefore we don't have to use appendChild
     singleMealEL.innerHTML = `
          <div class = "single-meal">
               <h2 class="single-meal-heading"> ${mealObject.strMeal} </h2>
               <img class="single-meal-img" src="${mealObject.strMealThumb}" alt="${mealObject.strArea} Dish">
               <h3 class="cuisine-type">${mealObject.strArea} Cuisine </h3>
               <h2 class="prep-heading">How to Cook</h2>
               <p class="prepration">${mealObject.strInstructions} </p>
               <h3 class = "ing-heading">Ingredients Required</h3>               
          </div>
     `

     //create a <ul> where we are going to append all the ingredients as <li>
     const ingredientContainer = document.createElement('ul')
     ingredientContainer.className = 'flexMe'
     console.log(ingredientContainer)

     //we know there are 20 ingredients only, so loop 20 times
     for (let i = 1; i <= 20; i++) {
          //create <li> for each ingredient
          const listItem = document.createElement('li')
          listItem.className = 'flex-child'

          //if ingredient is empty, then skip it
          if (mealObject[`strIngredient${i}`]) {
               listItem.textContent = mealObject[`strIngredient${i}`] + ' - ' + mealObject[`strMeasure${i}`]

               ingredientContainer.appendChild(listItem)
               singleMealEL.appendChild(ingredientContainer)
          }
     }
}

mealApp.searchRandomMeal = function () {
     mealApp.clearThePage()
     fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
          .then((res) => res.json())
          .then((data) => {
               const meal = data.meals[0]
               mealApp.displaySingleMeal(meal)
          })
}

mealApp.displayMeals = function (mealsArray) {
     mealsArray.forEach((meal) => {
          // console.log('MY MEAL:   ', meal)
          const imgDiv = document.createElement('div')
          imgDiv.className = 'meal'
          imgDiv.innerHTML = `
                                <img src = "${meal.strMealThumb}" alt = "${meal.strArea}Dish">
                                <div class = "meal-info">
                                      <h3> ${meal.strMeal}</h3>
                                </div>
                              `
          //appending the parent meals
          mealsEl.appendChild(imgDiv)
     })
}

mealApp.clearThePage = function () {
     mealsEl.innerHTML = ``
     resultHeadingEl.innerHTML = ``
     singleMealEL.innerHTML = ``
     search.value = ''
}

mealApp.searchMeal = function (e) {
     e.preventDefault()
     const term = search.value

     //if term is not empty, then hit the end point
     if (term.trim()) {
          const url = new URL(mealApp.url)
          url.search = new URLSearchParams({
               s: term,
          })
          fetch(url)
               .then((response) => response.json())
               .then((jsonData) => {
                    const mealsArray = jsonData.meals

                    if (mealsArray) {
                         mealApp.clearThePage()
                         resultHeadingEl.innerHTML = `<h2>${term.charAt(0).toUpperCase() + term.slice(1)} Meals : </h2>`
                         mealApp.displayMeals(mealsArray)
                    } else {
                         throw new Error('Please try again')
                    }
               })
               .catch((err) => {
                    mealApp.clearThePage()
                    resultHeadingEl.innerHTML = `<h2>Invalid Search. ${err.message}</h2>`
               })
     } else {
          mealApp.clearThePage()
          alert('Please enter a meal of your choice or hit random button for a surprise meal!')
     }
}

mealApp.init()
