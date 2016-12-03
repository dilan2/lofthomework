/**
 * Created by sergejglebko on 24.11.16.
 */

var cities = [];
var input = document.getElementsByTagName('INPUT')[0];
input.addEventListener('input', func);

function getCities(url) {
    return new Promise( function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.addEventListener('load', function() {
            resolve(xhr.response);
        });
        xhr.addEventListener('error', function() {
            reject();
        })

    } );
}


function func() {
     getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(function (response) {
            cities = [];
            var cont = JSON.parse(response);
            // var cities = [];
            for(var i = 0; i < cont.length; i++) {
                cities.push(cont[i].name);
            }
            cities.sort();
            // console.log(cities);
            search();

            // showDiv(cities);
        })
}

function search() {

    var data = input.value;
    window.list.innerHTML = '';
    if (!data) return;
    for (var i = 0; i < cities.length; i++) {
        if(cities[i].indexOf(data) > -1) {
            window.list.innerHTML += '<p>' + cities[i] + '</p>';
        }
    }
}













































