'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - UTILS
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * Returns a random hash.
 * @return {[type]} [description]
 */
function hash() {
  return Math.random().toString(32).substr(2, 16);
}

/**
 * Promise support delay.
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time || 0);
  });
}

/**
 * Create a function name dynamically.
 * The main purpose for this is to have certain instances semantically represented in the console.
 * @param  {[type]}   name [description]
 * @return {Function}      [description]
 */
function fn(name, func) {
  let strip = func.name;
  var strFn = func.toString().replace(`function ${strip}`, 'return function ' + name);
  return new Function(strFn)();
}

/**
 * Default Export
 */
module.exports = {wait, hash, fn};
