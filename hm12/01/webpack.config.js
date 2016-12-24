const webpack = require('webpack');

module.exports = {
    entry: "./entry",
    output: {
        filename: "build.js"
    },
    // resolve: {
    //     modulesDirectories: ['01']
    // },
    plugins: [
        new webpack.ProvidePlugin({
            Handlebars: 'handlebars'
        })
    ]
    // externals: {
    //     handlebars: "Handlebars"
    // }
};