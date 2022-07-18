// Find Me A Meal App

// Global Variables
const search = document.getElementById('search'),
     random = document.getElementById('random'),
     submit = document.getElementById('submit'),
     mealsEl = document.getElementById('meals'),
     resultHeadingEl = document.getElementById('result-heading'),
     singleMealEL = document.getElementById('single-meal')

const mealApp = {}
mealApp.url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`

function searchMeal(e) {
     e.preventDefault()
     const term = search.value.trim()

     //hit the api only if term is not empty
     if (term) {
          fetch(mealApp.url)
               .then((response) => {
                    return response.json()
               })
               .then((jsonResponse) => {
                    resultHeadingEl.innerHTML = `<h2>${term} meals: </h2>`

                    const meals = jsonResponse.meals
                    meals.forEach((meal) => {
                         // console.log(meal)
                         const imgDiv = document.createElement('div')
                         imgDiv.className = 'meal'
                         imgDiv.innerHTML = `
                                <img src = "${meal.strMealThumb}">
                                <div class = "meal-info">
                                      <h3> ${meal.strMeal}</h3>
                                </div>                              
                              `
                         console.log(imgDiv);

                         //appending the parent meals
                         mealsEl.appendChild(imgDiv)
                    })
               })

          //clears the text value
          search.value = ''
     } else {
          alert('Please provide your desired food')
     }
}

submit.addEventListener('submit', searchMeal)

// -------------------------------------------------
// document.querySelector('form').addEventListener('submit', function (e) {
//      e.preventDefault()
//      search = document.querySelector('input')

//      // API lets search meal by keyword
//      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
//           .then((res) => res.json())
//           .then((data) => {
//                console.log('FETCHING MEAL BY KEYWORD', data)
//           })
// })

// Namespace FindMeAMeal

//  for searching meal by id
// const mealId = 52850
// fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//      .then((res) => res.json())
//      .then((data) => {
//           console.log('FETCHING MEAL BY ID', data)
//      })

// // for searching meal randomly
// fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//      .then((res) => res.json())
//      .then((data) => {
//           console.log('FETCHING MEAL RANDOMLY', data)
//      })
