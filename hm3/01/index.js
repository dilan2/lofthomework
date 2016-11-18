let array = [1, 2, 3, 4, 5];

// forEach
function forEach(array, func) {
   for(var i = 0; i < array.length; i++) {
       func(array[i]);
   }

}

function func(arg) {
    console.log(arg);
}

// forEach(array, func);

//filter

function filter(array, func2) {
    var mas =[];
    var k =0;
    for(var i = 0; i < array.length; i++) {
        if( func2(array[i]) ) {
            mas[k] = array[i];
            k++;
        }
    }
    return mas;
}

// console.log(filter(array, item => item > 4));

// map


function map(array, func3) {
    var mas = [];
    var k = 0;
    for(var i = 0; i < array.length; i++) {
        mas[k] = func3(array[i]);
        k++;
    }
    return mas;
}

// console.log(map(array, item => item * 4));


// slice

function slice(array, a, b) {
    var mas = [];
    var k = 0;
    if(!a && !b) { mas = array; return mas;}
    if(!b) {b = array.length;}
    if(a < 0) {a = array.length+a; }
    if(b < 0) {b = array.length+b; }
    for(var i = a; i < b; i++) {
        mas[k] = array[i];
        k++;
    }
    return mas;
}

// console.log(slice(array, -4, -1));


// reduce

function reduce(array, func4, arg) {
    var temp;
    if(!arg) {
        arg = 0;
    }
    for(var i = 0; i < array.length; i++) {
        temp = func4(array[i], arg);
        arg = temp;
    }
    return temp;
}


function func4(a,b) {
    return a + b;
}

console.log(reduce(array, func4));


// splice

function splice() {
    var mas =[];
    var a = 0;
    for(var k = 0; k < arguments[1]; k++) {
        mas[a] = array[k];
        a++;
    }
    for (var i = arguments[1]; i < arguments[0].length; i++) {
        if (arguments[2] == 0 || i <= (arguments[1] + arguments[2])-1) {
            if(arguments[2] == 0 || i == (arguments[1] + arguments[2])-1) {
                for (var j = 3; j < arguments.length; j++) {
                    mas[a] = arguments[j];
                    a++;
                }
            }
        } else {
            mas[a] = arguments[0][i];
            a++;
        }
    }
    return mas;
}

// console.log(splice(array, 2, 2,'Первое', 'Второе', 'Третье', 'four'));
// массив / номер / количество  / вставить










