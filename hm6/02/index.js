/**
 * Created by sergejglebko on 24.11.16.
 */

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
        console.log(response);

            var cont = JSON.parse(response);
            var cities = [];
            for(var i = 0; i < cont.length; i++) {
                cities.push(cont[i].name);
            }
            // cities.sort();
            // res.innerHTML = cities;
            show(cities.sort());
        })
}


function show(arg) {
    var div = document.getElementById('res');
    var ul = document.createElement('ul');
    for(var i = 0; i < arg.length; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
        res.appendChild(ul);
        li.textContent = arg[i];
    }
}





func();