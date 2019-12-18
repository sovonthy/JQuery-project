
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// get api [arrow function]
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
$(document).ready(() => {
    requestApi();
// get all recipe [name function]
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
    });
});


// function 
function getRecipe(recipeID) {
    alldata.forEach(element => {
        var{id, name,iconUrl, ingredients, instructions,nbGuests} = element;
        if (id == recipeID) {
            getEachRecipe(name, iconUrl);
            eachIngredient(ingredients);
            eachStep(instructions);
            getMember(nbGuests);
            plus(element);
            minus(element);
            dataQuantity = element;
            oldGuest = element.nbGuests;
          
        }
    });
}
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
    plus(num);
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

// function to get name of recipe and image recipe
var getEachRecipe = (name, img) => {
    var nameOfRecipe = "";
    nameOfRecipe += `
        <h3>${name}</h3> 
    `;
    $('#recipeName').html(nameOfRecipe);

    var Recipe = "";
    Recipe += `
        <img src="${img}" width="200"> 
    `;
    $('#recipePic').html(Recipe);

}
// hide Ingredient text before choose recipe
$('#ingredient').hide();

// function to get all ingredient
function eachIngredient(ingredient) {
    var ing = "";
    ingredient.forEach(element => {
        var {iconUrl,quantity,unit,name} = element;
        ing += `
            <tr>
              <td><img src="${iconUrl}" width="70"></td>
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

// hide Introduction text before choose recipe
$('#introduction').hide();

// function to cut step of introduction
function eachStep(step) {
    var steps = step.split('<step>');
    var cutStep = "";
    for(var i =1; i < steps.length; i++) {
        cutStep += `
           <li class = "list-group-item" style= "border:none;">
            <strong class = "text-primary">Step:${i}</strong>
            <br>
            &nbsp;
            ${steps[i]}
            </li>
        `
    }
    $('#instruction').html(cutStep);
    // show Introduction text after choose recipe
    $('#introduction').show();
}
// function increase number when click plus button
function plus(number) {
    var addNumber = parseInt(number) +1;
    if(addNumber <= 15) {
        $("#input").val(addNumber);
        getGuest($("#input").val());
    }
}
// function decrease number when click minus button
function minus(number) {
    var minusNumber = parseInt(number)-1;
    if(minusNumber >= 1) {
        $("#input").val(minusNumber);
        getGuest($("#input").val());
    }
}

//new quantity = new guest * old quantity / old quest
// function to calculate quantity
function getGuest(ingredient) {
    var newQuanlity;
    var resultQuantity = "";
    dataQuantity.ingredients.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        newQuanlity = ingredient * quantity / oldGuest;
        resultQuantity += `
        <tr>
        <td><img src="${iconUrl}" style="width:70px"></td>
        <td id='quantity'>${newQuanlity}</td>
        <td>${unit[0]}</td>
        <td>${name}</td>
        </tr>
    `;
    });
     $("#table").html(resultQuantity);
}

