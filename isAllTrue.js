// /**
//  * Created by sergejglebko on 10.11.16.
//  */


var arr = [1, 2, 3, kdjv, vd];
//
function filterFn(a) {
    if(Boolean(a)) return true;

}

function isAllTrue(source, filterFn) {
    for (var i = 0; i < source.length; i++) {
       if( !filterFn(source[i]) ) {
           return false;
       } else {
           return true;
       }
    }
}

console.log(isAllTrue(arr, filterFn));