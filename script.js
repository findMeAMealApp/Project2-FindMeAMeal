//search for meal from api
//search random meal
// let search = 'chicken'

document.querySelector('form').addEventListener('submit', function (e) {
     e.preventDefault()
     const search = document.querySelector('input')

     // lets search meal by keyword
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
          .then((res) => res.json())
          .then((data) => {
               console.log('FETCHING MEAL BY KEYWORD', data)
          })
})

//  for searching meal by id
const mealId = 52850
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
     .then((res) => res.json())
     .then((data) => {
          console.log('FETCHING MEAL BY ID', data)
     })

// for searching meal randomly
fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
     .then((res) => res.json())
     .then((data) => {
          console.log('FETCHING MEAL RANDOMLY', data)
     })
