"use strict"

//* HTML Elements
let mainDish= document.querySelector(".main-dish");
let dishImg= document.querySelector(".dish-img");
let dishIName= document.querySelector(".dish-name");
let rowContent= document.querySelector(".row");
let navMenu = document.querySelector(".offcanvas");
let searchContainer = document.querySelector(".container");
let mealInput = document.querySelector(".container .row input:first-child");
let fInput = document.querySelector(".container .row input:last-child");
let submitBtn;



//!Main dish
async function mainAPI(){
    searchContainer.innerHTML = ""
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
        console.log(arr);
    }

    rowContent.innerHTML = mealshtml;
}


async function infoAPI(mealID){
    searchContainer.innerHTML="";
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
            tagshtml += `<li class="text-white m-2 p-1 list-unstyled tag-alert">${tags[i]}</li>`
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





        //?Category dish
        async function categAPI(){
            searchContainer.innerHTML="";
            rowContent.innerHTML="";
            let categs = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            
            categs = await categs.json();
            getCategories(categs.categories);
            }


function getCategories(arr){
    for (let i = 0; i < arr.length; i++) {
    let categories = `
    <div class="col-md-3">
    <div
      onclick="categMeals('${arr[i].strCategory}')"
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

async function categMeals(category) {
    rowContent.innerHTML="";
    let categs = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    
    categs = await categs.json();
    console.log(categs);
    getMainDishes(categs.meals.slice(0,20))
}
        async function areaAPI(){
            searchContainer.innerHTML="";
            rowContent.innerHTML="";
            let areas = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            
            areas = await areas.json();
            getAreas(areas.meals);
            }



        //& AREA dish
function getAreas(arr){
    for (let i = 0; i < arr.length; i++) {
    let areas = `
    <div class="col-md-3">
    <div
      onclick="areaMeals('${arr[i].strArea}')"
      class="areas mt-5 overflow-hidden position-relative cursor-pointer d-flex justify-content-center align-items-center flex-column"
    >
    <i class="fa-solid fa-location-dot fs-1 text-white"></i>
    <h2 class="text-black categ-name text-white">${arr[i].strArea}</h2>
    </div>
  </div>
    `
    rowContent.innerHTML += areas
}
}

async function areaMeals(area) {
    rowContent.innerHTML="";
    let areas = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    
    areas = await areas.json();
    console.log(areas);
    getMainDishes(areas.meals.slice(0,20))
}



        //~ Main dish
        async function ingredAPI(){
            searchContainer.innerHTML="";
            rowContent.innerHTML="";
            let ingreds = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            
            ingreds = await ingreds.json();
            getingreds(ingreds.meals);
            }


function getingreds(arr){
    for (let i = 0; i < arr.length; i++) {
    let ingreds = `
<div class="col-md-3">
<div
  onclick="ingredsMeals('${arr[i].strIngredient}')"
  class="ingreds mt-5 position-relative cursor-pointer d-flex justify-content-center align-items-center flex-column"
>
  <i class="fa-solid fa-drumstick-bite ingred-icon text-white"></i>
  <h2 class="h1 text-white categ-name text-white">${arr[i].strIngredient}</h2>
  <p class="text-white">
  ${arr[i].strDescription.split(" ").slice(0,20).join(" ")}
  </p>
</div>
</div>
   `
    rowContent.innerHTML += ingreds
}
}

async function ingredsMeals(ingredient) {
    searchContainer.innerHTML="";
    rowContent.innerHTML="";
    let ingreds = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    
    ingreds = await ingreds.json();
    console.log(ingreds);
    getMainDishes(ingreds.meals.slice(0,20))
}
function contactUs() {
    searchContainer.innerHTML="";
    rowContent.innerHTML = ""
    let contactForm = `<div class="contact-us min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="validateInput()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="validateInput()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validateInput()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validateInput()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="validateInput()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="confirmInput" onkeyup="validateInput()" type="password" class="form-control " placeholder="Confirm Your Password">
                <div id="confirmAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
rowContent.innerHTML += contactForm;
submitBtn = document.getElementById("submitBtn");


document.getElementById("nameInput").addEventListener("focus", () => {
    editName = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    editEmail = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    editPhone = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    editAge = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    editPass = true
})

document.getElementById("confirmInput").addEventListener("click",()  => {
    editConfirm = true
})
}




let editAge = false;
let editEmail = false;
let editName = false;
let editPass = false;
let editPhone = false;
let editConfirm = false;



function validateInput() {
    if(editName){
        if(validateName()){
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        }
    else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
    }
}
    if(editEmail){
        if(validateEmail()){
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            }
        else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block")
        }
    }
    if(editPass){
        if(validatePass()){
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            }
        else{
            document.getElementById("passwordAlert").classList.replace("d-none","d-block")
        }
    }
    if(editPhone){
        if(validatePhone()){
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            }
        else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        }
    }
    if(editConfirm){
        if(validateConfirm()){
            document.getElementById("confirmAlert").classList.replace("d-block", "d-none")
            }
        else{
            document.getElementById("confirmAlert").classList.replace("d-none","d-block")
        }
    }
    if(editAge){
        if(validateAge()){
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            }
        else{
            document.getElementById("ageAlert").classList.replace("d-none","d-block")
        }
    }

      if (validateName() &&
        validateEmail() &&
        validatePass() &&
        validatePhone() &&
        validateConfirm() &&
        validateAge()) {
            document.getElementById("submitBtn").removeAttribute("disabled")
        }
        else{
            submitBtn.setAttribute("disabled","true")
        }

    }



    function validateName() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
    }
    function validateAge() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
    }
    
    function validateEmail() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
    }
    
    function validatePhone() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
    }
    
    function validatePass() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    }
    
    function validateConfirm() {
        return document.getElementById("confirmInput").value == document.getElementById("passwordInput").value
    }



    function showSearchInputs(){
        searchContainer.innerHTML = `      
          <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="search1st(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div
    </div>`
    rowContent.innerHTML = "";
    }

   async function searchName(name) {
        rowContent.innerHTMl = ""
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

        data = await data.json();
        console.log(data.meals);
        getMainDishes(data.meals)
      }
    async function search1st(name) {
        rowContent.innerHTMl = ""
        name == "" ? name = "a" : ""
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);

        data = await data.json();

        console.log(data.meals);
        data.meals ? getMainDishes(data.meals) : getMainDishes([]);
      }
