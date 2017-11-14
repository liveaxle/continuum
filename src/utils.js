'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - UTILS
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * [hash description]
 * @return {[type]} [description]
 */
export function hash() {
  return Math.random().toString(32).substr(2, 16);
}

/**
 * [wait description]
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time || 0);
  });
}

/**
 * [fn description]
 * @param  {[type]}   name [description]
 * @return {Function}      [description]
 */
export function fn(name, func) {
  let strip = func.name;
  var strFn = func.toString().replace(`function ${strip}`, 'return function ' + name);
  return new Function(strFn)();
}

/**
 * Default Export
 */
export default {wait, hash, fn};
