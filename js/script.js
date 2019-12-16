

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() => {
    requestApi();
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
      
    });
    $('#plus').on('change', function () {
        var add = $('$input').val();
        if(num < 15) {
            addMembers(num);
           }
    })
});
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

 // function click on icon sum
$("#plus").on('click', function () {
    var number = parseInt($("#input").val());
    sum(number);
})
// function click on icon minus
$("#minus").on('click', function () {
    var number = parseInt($("#input").val());
    minus(number);
})
}


function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
var alldata = [];
function chooseRecipe(rechipe) {
    alldata = rechipe;
    var select = "";
    rechipe.forEach(element => {
        select += `
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(select);
}
function getRecipe(rechipeId) {
    alldata.forEach(element => {
        var{id, name,iconUrl, ingredients, instructions,nbGuests} = element;
        if (id == rechipeId) {
            getEachRecipe(name, iconUrl);
            eachIngredient(ingredients);
            eachStep(instructions);
            getMember(nbGuests);
            sum(element);
            minus(element);
            getQuanlities = element;
            //get OldGuest
            oldGuest = element.nbGuests;
        }
    });
}

var getEachRecipe = (name, img) => {
    var nameOfRecipe = "";
    nameOfRecipe += `
        <h3>${name}</h3> 
    `;
    $('#card').html(nameOfRecipe);

    var Recipe = "";
    Recipe += `
        <img src="${img}" width="200"> 
    `;
    $('#cards').html(Recipe);

}
/// Get ingredients
$('#ingredient').hide();
function eachIngredient(ingredient) {
    var ing = "";
    ingredient.forEach(el => {
        ing += `
            <tr>
              <td><img src="${el.iconUrl}" width="100"></td>
                <td>${el.quantity}</td>
                <td>${el.unit[0]}</td>
                <td>${el.name}</td>
            </tr>
        `;
    });
    $('#table').html(ing);
    $('#ingredient').show();
}

//// get instruction
$('#introduction').hide();
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
    $('#introduction').show();
}



function sum(number) {
    var add = parseInt(number) +1;
    if(add <= 15) {
        $("#input").val(add);
        getPerson($("#input").val());
    }
}
// decrease value when click on icon minus
function minus(number) {
    var minus = parseInt(number)-1;
    if(minus >= 1) {
        $("#input").val(minus);
        getPerson($("#input").val());
    }
}


//new quantity = new guest * old quantity / old quest
// function for new quanlity
function getPerson(person) {
    var quantities;
    var newQuanlity;
    var result = "";
    getQuanlities.ingredients.forEach(element => {
        var {quantity,iconUrl,name,unit} = element;
        quantities = quantity/oldGuest;
        newQuanlity = quantities*person;
        result += `
        <tr>
        <td><img src="${iconUrl}" style="width:50px"></td>
        <td id='quantity'>${newQuanlity}</td>
        <td>${unit[0]}</td>
        <td>${name}</td>
        </tr>
    `;
    });
     $("#ingredient").html(result);
}
