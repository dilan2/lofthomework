var Controller = require('./controller.js');


module.exports = {
// var Router = {
    handle: function (route) {
        var routeName = route + 'Route';

        Controller[routeName]();
    }
// };
};