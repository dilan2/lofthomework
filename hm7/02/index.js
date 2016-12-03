/**
 * Created by sergejglebko on 28.11.16.
 */
var Cookie = {
    update: function() {
        if (document.cookie) {
            var mas = document.cookie.replace(/([\.$?*|{}\(\)\[\]\\\/\s\+^])/g, '').split(";");
            for(var i = 0; i < mas.length; i++) {
                temp.cookie[mas[i].split("=")[0]] = mas[i].split("=")[1] + "";
            }
        } else {
            temp.cookie = {};
        }
    },
    set: function(name, val, path, expires) {
        if(expires) {
            var date = new Date;
            date.setDate(date.getDate() + (+expires) );
            expires = date.toUTCString();
        } else {
            expires = '';
        }
        document.cookie = name + "=" + val + "; path=" + path + ";expires = " + expires;
        this.update();
    }
};
var temp = {
    cookie: {},
}
Cookie.update();

// console.log(x);

function getCoockies() {
    var x = document.cookie;
    window.list.innerHTML = '';
    if(x) {
        var parts = x.split('; ');
        var cks = [];
        for (var i = 0; i < parts.length; i++) {
            var temp = {};
            temp.name = parts[i].split('=')[0];
            temp.val = parts[i].split('=')[1];
            cks.push(temp);
        }
        createTable(cks);
    }
}


function createTable(arr) {
    // console.log(arr);
    var table = document.createElement('table');

    for (var i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        for(var key in arr[i]) {
            // console.dir(arr[i][key]);
            var td = document.createElement('td');
            td.innerHTML = arr[i][key];
            tr.appendChild(td);
        }
        var bu = document.createElement('button');
        tr.appendChild(bu);
        bu.setAttribute('onclick', 'del(this.parentNode.children[0].textContent)');
        bu.textContent = 'Удалить';
        table.appendChild(tr);
    }
    list.appendChild(table);

}

function del(arg) {
    console.log(arg);
    var question = confirm('Удалить cookie с именем ' + arg + '?');
    if(question) {
        deleteCookie(arg);
    }
}


function deleteCookie(name) {
    console.log(name);
    Cookie.set(name, "", "/", -1);
    getCoockies();
}




var button = document.getElementById('add');
button.addEventListener('click', handler);

function handler(e) {
    e.preventDefault();
    var parent = document.getElementsByClassName('newcook')[0];
    if(parent.children[0].value && parent.children[1].value && parent.children[2].value) {
        Cookie.set(parent.children[0].value, parent.children[1].value, '/', parent.children[2].value);
        for(var i = 0; i < parent.children.length; i++){
            parent.children[i].value = '';
        }
    } else {
        alert("Заполните все поля формы");
    }
}












