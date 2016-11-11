let array = [1, 2, 3, 4, 5, 6];

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
    for(var i = 0; i < array.length; i++) {
        if( func2(array[i]) ) {
            mas.push(array[i]);
        }
    }
    return mas;
}

// console.log(filter(array, item => item > 4));

// map


function map(array, func3) {
    var mas = [];
    for(var i = 0; i < array.length; i++) {
        mas.push( func3(array[i]) );
    }
    return mas;
}

// console.log(map(array, item => item * 4));


// slice

function slice(array, a, b) {
    var mas = [];
    for(var i = a; i < b-1; i++) {
        mas.push(array[i]);
    }
    return mas;

}

// console.log(slice(array, 2, 5));


// reduce

function reduce(array, func4, arg) {
    var temp;
    for(var i = 0; i < array.length; i++) {
        temp = func4(array[i], arg);
        arg = temp;
    }
    return temp;

}


function func4(a,b) {
    return a + b;
}

// console.log(reduce(array, func4, 0));


// splice

function splice() {
    var mas =[];
    for(var k = 0; k < arguments[1]; k++) {
        mas.push(array[k]);
    }
    for (var i = arguments[1]; i < arguments[0].length; i++) {
        if (i <= (arguments[1] + arguments[2])-1  ) {
            // continue;
            if(i == (arguments[1] + arguments[2])-1) {
                for (var j = 3; j < arguments.length; j++) {
                    mas.push(arguments[j]);
                }
            }
        } else {
            mas.push(arguments[0][i]);
        }

    }
    return mas;
}

console.log(splice(array, 2, 2,'Первое', 'Второе', 'Третье'));











