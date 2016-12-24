function test(del) {
    if(del == 0) {
        throw new Error('На 0 делить нельзя!');
    }

}

function Calculator(firstNumber) {
    this.firstNumber = firstNumber;
}

Calculator.prototype.sum = function () {
    var res = this.firstNumber;
    for(var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res;
}
Calculator.prototype.dif = function () {
    var res = this.firstNumber;
    for(var i = 0; i < arguments.length; i++) {
        res -= arguments[i];
    }
    return res;
}
Calculator.prototype.div = function () {
    var res = this.firstNumber;
    for(var i = 0; i < arguments.length; i++) {
        try {
            test(arguments[i]);

            res = res / arguments[i];
        } catch (e) {
            console.log(e);
            return;
        }
    }
    return res;
}
Calculator.prototype.mul = function () {
    var res = this.firstNumber;
    for(var i = 0; i < arguments.length; i++) {
        res *= arguments[i];
    }
    return res;
}




function inherit(child, parent) {
    SqrCalc.prototype = Object.create(Calculator.prototype);
    child.prototype.constructor = child;
    child.prototype.parent = parent;
}



function SqrCalc(firstNumber) {
    this.firstNumber = firstNumber;
}

inherit(SqrCalc, Calculator);


for(var i in new Calculator()) {
    // console.log(i);
    SqrCalc.prototype.i = function () {
        var mas = arguments;
        return Math.pow(this.parent.prototype.i.apply(this, mas),2);
    }
}

SqrCalc.prototype.sum = function() {
    var mas = arguments;
    var t = this.parent.prototype.sum.apply(this, mas);
//        console.log(t);
    return t*t;
}

SqrCalc.prototype.dif = function() {
    var mas = arguments;
    var t =  this.parent.prototype.dif.apply(this, mas);
    return t*t;
}

SqrCalc.prototype.div = function() {
    var mas = arguments;
    var t =  this.parent.prototype.div.apply(this, mas);
    return t*t;
}

SqrCalc.prototype.mul = function() {
    var mas = arguments;
    var t =  this.parent.prototype.mul.apply(this, mas);
    return t*t;
}



let myCalculator = new SqrCalc(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000
console.dir(SqrCalc);







//ES6






