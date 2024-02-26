
let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/app.js').sass('resources/scss/app.scss','public/app.css');