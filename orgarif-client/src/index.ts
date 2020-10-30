// [doc] this file exists to control important imports order
// (moreover, prettier-plugin-organize-imports now gets in the way of import './stuff'; order)
// now polyfills are already loaded in case something is done 'synchronously' in imports
require('es6-shim');
require('es7-shim');
require('es6-promise/auto');
require('whatwg-fetch');
require('./utilities-impl');
require('./application-bootstrap');
