// grab DOM elements

const search = document.getElementById('search'),
     random = document.getElementById('random'),
     submit = document.getElementById('submit'),
     mealsEl = document.getElementById('meals'),
     resultHeadingEl = document.getElementById('result-heading'),
     singleMealEL = document.getElementById('single-meal')

const mealApp = {}

mealApp.baseUrl = 'https://www.themealdb.com'

mealApp.init = function () {
     submit.addEventListener('submit', mealApp.searchMeal)
     random.addEventListener('click', mealApp.searchRandomMeal)
     mealsEl.addEventListener('click', mealApp.generateMealId)
}

mealApp.displaySingleMeal = function (mealObject) {
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
     const url = new URL(mealApp.baseUrl)
     url.pathname = '/api/json/v1/1/random.php'
     fetch(url)
          .then((res) => res.json())
          .then((data) => {
               const meal = data.meals[0]
               mealApp.displaySingleMeal(meal)
          })
}

mealApp.displayMeals = function (mealsArray) {
     mealsArray.forEach((meal) => {
          const imgDiv = document.createElement('div')
          imgDiv.className = 'meal'
          imgDiv.innerHTML = `
                                <img src = "${meal.strMealThumb}" alt = "${meal.strArea}Dish">
                                <div class = "meal-info" meal-id="${meal.idMeal}">
                                      <h3> ${meal.strMeal}</h3>
                                </div>
                              `
          //appending the parent meals
          mealsEl.appendChild(imgDiv)
     })
}

mealApp.generateMealId = function (e) {
     /**
      * The unique id is fetched depending on where the user clicked.
      * if user click on img(i.e. DIV) , then extract the id and save it in 'id' variable
      * if user click on title of img (i.e. H3), then extract the id accodingly and save it in id variable
      * if user click between the image (i.e. gutter i.e. DIV), then notify the user, and request the user to click on the image instead
      * use that id and call searchMealById()
      * note: id is of type string, we casted it into a integer Number(string variable)
      */

     let id
     if (e.target.tagName === 'H3') {
          id = e.target.parentNode.attributes[1].value
          mealApp.searchMealById(Number(id))
     } else {
          if (e.target.attributes['meal-id']) {
               id = e.target.attributes['meal-id'].value
               mealApp.searchMealById(Number(id))
          } else {
               document.querySelector('h2').innerHTML = `<h2>Please Click on the Image</h2>`
          }
     }
}

mealApp.searchMealById = function (id) {
     mealApp.clearThePage()
     const url = new URL(mealApp.baseUrl)
     url.pathname = '/api/json/v1/1/lookup.php'
     url.search = new URLSearchParams({
          i: id,
     })
     fetch(url)
          .then((res) => res.json())
          .then((data) => {
               const meal = data.meals[0]
               mealApp.displaySingleMeal(meal)
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
     //trim() function take of extra space on both side of input string
     if (term.trim()) {
          const url = new URL(mealApp.baseUrl)
          url.pathname = '/api/json/v1/1/search.php'
          url.search = new URLSearchParams({
               s: term.trim(),
          })
          fetch(url)
               .then((response) => response.json())
               .then((jsonData) => {
                    const mealsArray = jsonData.meals

                    //the innerHTML makes first letter of searched term capital
                    if (mealsArray) {
                         mealApp.clearThePage()
                         resultHeadingEl.innerHTML = `<h2>${term.trim().charAt(0).toUpperCase() + term.trim().slice(1)} Meals : </h2>`
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
          alert('Please enter a meal of your choice e.g. chicken, beef, vegetarian etc OR  hit random button for a surprise meal!')
     }
}

mealApp.init()
