// Find Me A Meal App

// Global Variables
const search = document.getElementById('search'),
random = document.getElementById('random'),
submit = document.getElementById('submit'),
mealsEl = document.getElementById('meals'),
resultHeadingEl = document.getElementById('result-heading'),
singleMealEL = document.getElementById('single-meal');



function searchMeal(e){
     e.preventDefault();
     const term = search;
     console.log(term.value.trim());
}

submit.addEventListener('submit', searchMeal)

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

const mealApp = {}

// 

// 

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
