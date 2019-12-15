

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
});
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
        if (element.id == rechipeId) {
            getEachRecipe(element.name, element.iconUrl);
            eachIngredient(element.ingredients);
            eachStep(element.instructions);
        }


    });
}


var getEachRecipe = (name, img) => {
    var result = "";
    result += `
        <h3>${name}</h3> 
    `;
    $('#card').html(result);

    var results = "";
    results += `
        <img src="${img}" width="120"> 
    `;
    $('#cards').html(results);

}


/// Get ingredients
$('#ingredient').hide();
function eachIngredient(ingredient) {
    var ing = "";
    ingredient.forEach(el => {
        ing += `
    
            <tr>
              <td><img src="${el.iconUrl}" width="50"></td>
                <td>${el.name}</td>
                <td>${el.quantity}</td>
                <td>${el.unit[0]}</td>
                
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
    var listStep = "";
    for(var i =1; i < steps.length; i++) {
        listStep += `
           <li class = "list-group-item" style= "border:none;">
            <strong class = "text-primary">Step:${i}</strong>
            <br>
            &nbsp;
            ${steps[i]}
            </li>
        `
    }
    $('#instruction').html(listStep);
    $('#introduction').show();
}







