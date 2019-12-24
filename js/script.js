//function get api
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
//function request API 
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
//function start process
$(document).ready(() => {
    requestApi();
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
    });
});
//function show all information from api
function getRecipe(recipeID) {
    alldata.forEach(element => {
        var{id, name,iconUrl, ingredients, instructions,nbGuests} = element;
        if (id == recipeID) {
            getEachRecipe(name, iconUrl);
            eachIngredient(ingredients);
            eachStep(instructions);
            getMember(nbGuests);
            sum(element);
            minus(element);
            allQuantities = element;
            oldGuest = element.nbGuests;
          
        }
    });
}
// function to get input number of guest 
function  getMember(nubGuest){
    var choose = "";
        choose +=`
        <h4>Number of person</h4>  &nbsp; &nbsp;
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" id="minus" type="submit">-</button>
            </div>
            <input type="text" id="input" class="form-control text-center" disabled value="${nubGuest}">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" id="plus" type="submit">+</button>
            </div>
        `;
        $('#choose').html(choose);

 // function when we click minus button
$("#plus").on('click', function () {
    var num = parseInt($("#input").val());
    sum(num);
})
// function when we click plus button
$("#minus").on('click', function () {
    var num = parseInt($("#input").val());
    minus(num);
})
}

//function to get all recipe in select box 
var alldata = [];
function chooseRecipe(recipe) {
    alldata = recipe;
    var select = "";
    recipe.forEach(element => {
        var {id, name} = element;
        select += `
            <option value = "${id}">${name}</option>
        `;
    });
    $('#recipe').append(select);
}

$('#greenCard').hide();
// function to get name of recipe and image recipe
var getEachRecipe = (name, img) => {
    var nameOfRecipe = "";
    nameOfRecipe += `
        <h3>${name}</h3> 
    `;
    $('#recipeName').html(nameOfRecipe);
    $('#greenCard').show();

    var Recipe = "";
    Recipe += `
        <img src="${img}" class="img-thumbnail" width="200"> 
    `;
    $('#recipePic').html(Recipe);

}
// function to get all ingredient
$('#ingredient').hide();
function eachIngredient(ingredient) {
    var ing = "";
    ingredient.forEach(element => {
        var {iconUrl,quantity,unit,name} = element;
        ing += `
            <tr>
              <td><img src="${iconUrl}" width="60"></td>
                <td>${quantity}</td>
                <td>${unit[0]}</td>
                <td>${name}</td>
            </tr>
        `;
    });
    $('#table').html(ing);

     // show Ingredient text after choose recipe
    $('#ingredient').show();
}

// function to cut step of introduction
$('#introduction').hide();
function eachStep(step) {
    var steps = step.split('<step>');
    var cutStep = "";
    for(var i =1; i < steps.length; i++) {
        cutStep += `
           <li class = "list-group-item" style= "border:none;">
            <strong class = "text-primary">Step:${i}</strong>
            <br>
            &nbsp; &nbsp;
            ${steps[i]}
            </li>
        `
    }
    $('#instruction').html(cutStep);
    $('#introduction').show();
}

// function increase number when click plus button
function sum(number) {
    var add = parseInt(number) +1;
    if(add <= 15) {
        $("#input").val(add);
        getGuest($("#input").val());
    }
}
// function decrease number when click minus button
function minus(number) {
    var minus = parseInt(number)-1;
    if(minus >= 1) {
        $("#input").val(minus);
        getGuest($("#input").val());
    }
}


//new quantity = new guest * old quantity / old quest
// function for new quanlity
function getGuest(newQuest) {
    var newQuantity;
    var result = "";
    allQuantities.ingredients.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        newQuantity = quantity/oldGuest*newQuest;
        result += `
        <tr>
        <td><img src="${iconUrl}" style="width:60px"></td>
        <td>${newQuantity}</td>
        <td>${unit[0]}</td>
        <td>${name}</td>
        </tr>
    `;
    });
     $("#table").html(result);
}

