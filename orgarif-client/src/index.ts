// organize-imports-ignore
/**
 * [doc] this file exists to control important imports order
 * auto prettier-plugin-organize-imports reordering is blocked by 'organize-imports-ignore'
 * polyfills must be loaded first in case of things done 'synchronously' in files
 */
import 'es6-promise/auto';
import 'es6-shim';
import 'es7-shim';
import 'whatwg-fetch';
import './application-bootstrap';
