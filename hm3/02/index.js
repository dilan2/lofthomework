/**
 * Created by sergejglebko on 12.11.16.
 */
function deepEqual(objA, objB) {
    if( (objA == null) || (objB == null) ) {
        return false;
    }
    if( typeof objA != "object" && typeof objB != "object") {
        return objA == objB;
    } else if(typeof objA != "object" || typeof objB != "object") {
        return false;
    }
    if(objA instanceof Date && objB instanceof Date) {
        return objA.getTime() == objB.getTime();
    }else if(objA instanceof Date || objB instanceof Date) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length != keysB.length) {return false;}
    return !keysA.filter(function (key) {
                if (typeof objA[key] == "object" || Array.isArray(objA[key])) {
                    return !deepEqual(objA[key], objB[key]);
                } else {
                    return objA[key] !== objB[key];
                }
            }).length;
}




var objA = {

    prop1: 'value1',

    prop2: 'value2',

    prop3: 'value3',

    prop4: {

        subProp1: 'sub value1',

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        }

    },

    prop5: 1000,

    prop6: new Date(2016, 2, 10)

};


var objB = {

    prop5: 1000,

    prop3: 'value3',

    prop1: 'value1',

    prop2: 'value2',

    prop6: new Date('2016/03/10'),

    prop4: {

        subProp2: {

            subSubProp1: 'sub sub value1',

            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]

        },

        subProp1: 'sub value1'

    }

};


console.log(deepEqual(objA, objB));

// console.log(objA.prop1 !== objB.prop1);