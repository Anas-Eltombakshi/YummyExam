"use strict"

//* HTML Elements
let mainDish= document.querySelector(".main-dish");
let dishImg= document.querySelector(".dish-img");
let dishIName= document.querySelector(".dish-name");
let rowContent= document.querySelector(".row");

async function mainAPI(){
let dishApi = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");

dishApi = await dishApi.json();
console.log(dishApi);
getMainDishes(dishApi.meals)
}

mainAPI();


function getMainDishes(arr) { 
    let mealshtml = ``;

    for (let i = 0; i < arr.length; i++) {
        mealshtml += `
        <div class="col-md-3">
        <div onclick = "infoAPI(${arr[i].idMeal})"class="main-dish rounded-2 mt-5 overflow-hidden position-relative cursor-pointer">
            <img src="${arr[i].strMealThumb}" alt="molockia" class="dish-img rounded-2 w-100 h-100 ">
            <div class="white-img-layer position-absolute d-flex align-items-center text-black p-2 rounded-2">
                <h2 class="text-black mt-4 dish-name">${arr[i].strMeal}</h2>
            </div>
          </div>
          </div>
        `
    }

    rowContent.innerHTML += mealshtml;
}


async function infoAPI(mealID){
    rowContent.innerHTML="";
    let info = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    
    info = await info.json();
    console.log(info);
    console.log(info.meals[0]);
    getInfo(info.meals[0]);
    }




function getInfo(meal){
    let ingredients =``

      
    for( let i = 1; i <= 20 ; i++){
        if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1 list-unstyled ingredients-alert">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
            }
        

            let tags = meal.strTags?.split(",")
            if(!tags)tags = [];
            let tagshtml = ``
            for(let i = 0;  i < tags.length; i++){
            tagshtml += `<li class="alert alert-danger m-2 p-1 list-unstyled tag-alert">${tags[i]}</li>`
            }

            let dishinfo = `<div class="dish-overview col-md-4">
            <img src="${meal.strMealThumb}" alt=""  class="rounded-2 specif-img"/>
            <h2 class="text-white dish-info-name">${meal.strMeal}</h2>
          </div>
          <div class="dish-instructions col-md-8 text-white">
            <h2 class="text-white dish-info-name">Instructions:</h2>
            <p>
${meal.strInstructions}
            </p>
            <h2 class="text-white dish-info-name"><span class="fw-bolder">Area: </span>${meal.strArea}</h2>
            <h2 class="text-white dish-info-name"><span class="fw-bolder">Category: </span>${meal.strCategory}</h2>
            <h2 class="text-white dish-info-name"><span class="fw-bolder">Recipes:</h2>
              <ul class = "d-flex w-100 flex-wrap">${ingredients}</ul>
              <h2 class="text-white dish-info-name"><span class="fw-bolder">Tags:</h2>
              <ul class = "d-flex w-100 flex-wrap">${tagshtml}</ul>
              <a class="btn btn-success mb-4" href="${meal.strSource}" target="_blank">Source</a>
              <a class="btn btn-danger mb-4"" href="${meal.strYoutube}" target="_blank">Youtube</a>
          </div>`

          rowContent.innerHTML += dishinfo;
        }    


        async function categAPI(){
            rowContent.innerHTML="";
            let categs = await fetch(`www.themealdb.com/api/json/v1/1/categories.php`);
            
            categs = await categs.json();
            getCategories(categs);
            }


function getCategories(arr){
    for (let i = 0; i < arr.length; i++) {
    let categories = `
    <div class="col-md-3">
    <div
      onclick="categMeals()"
      class="categories mt-5 overflow-hidden position-relative cursor-pointer"
    >
      <img src="${arr[i].strCategoryThumb}" alt="molockia" class="categ-img rounded-2 w-100 h-100" />
      <div
        class="white-img-layer position-absolute d-flex align-items-center text-black p-2 rounded-2 d-flex flex-column text-center"
      >
        <h2 class="text-black categ-name">${arr[i].strCategory}</h2>
        <p class="text-black mt-4 categ-desc">
        ${arr[i].strCategoryDescription.split(" ").splice("0,30").join(" ")}
        </p>
      </div>
    </div>
  </div>
    `
    rowContent.innerHTML += categories
}
}