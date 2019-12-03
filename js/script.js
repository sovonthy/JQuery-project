

$(document).ready(function() {
    var  url = 'https://raw.githubusercontent.com/radytrainer/test-api/master/test.json';
    $.ajax({
       dataType: 'json',
       url: url,
       success: function(data) {
           var result = "";
           data.recipes.forEach(el => {
               result += `
               <div class="col-4">
               <div class="card shadow-lg mt-5">
               <div class="card-body">
               ${el.name}
               <img src="${el.iconUrl}" class="img-fluid rounded">
               </div>
             
               </div>
               </div>
             
               `
           });
           $('.row').append(result);
       }
    })
})
