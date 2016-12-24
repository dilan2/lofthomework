class Calculator {
    constructor(name) {
        this.firstNumber = name;
    }
    test(del) {
        if(del == 0) {
            throw new Error('На 0 делить нельзя!');
        }

    }
    sum() {
        var res = this.firstNumber;
        for(var i = 0; i < arguments.length; i++) {
            res += arguments[i];
        }
        return res;
    }
    dif() {
        var res = this.firstNumber;
        for(var i = 0; i < arguments.length; i++) {
            res -= arguments[i];
        }
        return res;
    }
    div() {
        var res = this.firstNumber;
        for(var i = 0; i < arguments.length; i++) {
            try {
                this.test(arguments[i]);

                res = res / arguments[i];
            } catch (e) {
                console.log(e);
                return;
            }
        }
        return res;
    }
    mul() {
        var res = this.firstNumber;
        for(var i = 0; i < arguments.length; i++) {
            res *= arguments[i];
        }
        return res;
    }
}


class SqrCalc extends Calculator {
    sum() {
        return Math.pow(super.sum.apply(this, arguments),2);
    }
    dif() {
        return Math.pow(super.dif.apply(this, arguments),2);
    }
    div() {
        return Math.pow(super.div.apply(this, arguments),2);
    }
    mul() {
        return Math.pow(super.mul.apply(this, arguments),2);
    }
}







let myCalculator = new SqrCalc(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000
