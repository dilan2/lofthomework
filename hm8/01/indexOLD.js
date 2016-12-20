function func() {
    new Promise(function (resolve) {
        if (document.readyState == 'complete') {
            resolve();
        } else {
            window.onload = resolve;
        }
    }).then(function () {
        getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then(function (response) {
            var cont = JSON.parse(response);

            function sorter(a, b) {
                return a.name.localeCompare(b.name);
            }

            cont.sort(sorter);
            var data = input.value;
            if (!data) {
                var contres = cont;
            } else {
                var contres = cont.filter(function (arg) {
                    return arg.name.indexOf(data) > -1;
                })
            }
            let source = citiesList.innerHTML;
            let templFn = Handlebars.compile(source);
            let template = templFn({items: contres});
            list.innerHTML = template;
        })
    })
}

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
func();
var input = document.getElementsByTagName('INPUT')[0];
input.addEventListener('input', func);













































