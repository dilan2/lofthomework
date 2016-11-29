/**
 * Created by sergejglebko on 24.11.16.
 */
function timer(s) {
    return  promise = new Promise( function (resolve, reject) {
        setTimeout((function () {
            resolve('вывелась');
        }), s)
    });
    // promise.then(function (a) {
    //     console.log(a);
    // })
}

// timer(1000);

timer(3000).then(() => console.log('я вывелась через 3 секунды'))


//
//     setTimeout( (function() {
//         resolve('вывелась')}), s);
// });
// };
//
// promise.then( function (a) {console.log(a);
//
// });