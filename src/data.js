'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - DATA
 ***********************************************************************************************************************************************
 * @description Consistent data class for managing state, etc.
 */
import _ from 'lodash';

/**
 * [config description]
 * @type {Object}
 */
export default class Data {
  constructor(data, config={}) {
    this.__proto__.config = Object.assign({mutable: false}, config);

    if(data === undefined || data === null) throw new Error(`System.Data - No data provided`);

    // Set up API bindings
    this.mapify = this.mapify.bind(this, data);

    // Set up getters
    Object.defineProperty(this, 'data', {
      configurable: false,
      get: () => {
        return data;
      },
      set: (val) => {
        if(!this.config.mutable || this.immuatable) return;
      }
    });
  }

  /**
   * [mapify description]
   * @param  {[type]} data [description]
   * @param  {[type]} key  [description]
   * @return {[type]}      [description]
   */
  mapify(data, map) {
    let mapping = {}

    if(!data  || data.constructor !== Array) {
      throw new Error(`System.Data - Mapify - This function is intended to convert Array instance data into a map was given: ${data} - instead`);
    }

    if(!map) {
      throw new Error(`System.Data - Mapify - This function is intended to convert Array instance data into a map by a given map, was given: ${map} - instead`);
    }

    // BUild top level map items
    Object.keys(map).forEach(key => mapping[key] = {});

    // Loop through data and
    data.forEach(d => {
      Object.keys(map).forEach(key => {
        let name = _.at(d, map[key])[0];
        mapping[key][name] = mapping[key][name] || []
        mapping[key][name].push(d);
      });
    });

    return mapping;
  }

}

//
// DATA STATIC METHODS
//------------------------------------------------------------------------------------------//
// @description
//

/**
 * [description]
 * @param  {[type]} src         [description]
 * @param  {[type]} swap        [description]
 * @param  {Object} [config={}] [description]
 * @return {[type]}             [description]
 */
Data.swap = function(src, swap, config={}) {
  let counter = -1;

  config = Object.assign({unique: false, random: false}, config);

  if((!src || src && src.constructor !== Array)
    || (!swap || swap && swap.constructor !== Array)) {
      throw new Error(`System.Data - Swap: Both data sources must be an Array`);
    }

  if(config.unique && swap.length < src.length) {
    throw new Error(`System.Data - Swap: You specified 'unique' but your swap array has less elements than your source array.`);
  }

  return src.map((n) => {
    counter++;

    if(config.random) {
      return swap[counter % swap.length]; // test this
    }

    if(config.unique) {
      // support unique cases
    }

    if(swap[counter]) {
        return swap[counter];
    } else {
      counter=0;
      return swap[counter];
    }
  });
}

/**
 *
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
Data.arrayify = function(obj, config={}) {
    if(!obj || obj && obj.constructor !== Object) {
      throw new Error(`System.Data - Arrayify: Requires an object. Got: ${obj}`)
    }

    config = Object.assign({values: true, keys: true}, config);

    return Object.keys(obj).map(key => {
      if(!config.keys && config.values) {
        return obj[key];
      }

      if(config.keys && !config.values) {
        return key;
      }

      if(config.keys && config.values) {
        let map = {};
            map[key] = obj[key];

        return map;
      }

      return 'y tho';
    });
}

/**
 * UTILS NAMESPACE
 * @type {Object}
 */
Data.utils = {};

/**
 * [hash description]
 * @return {[type]} [description]
 */
Data.utils.hash = () => {
  return Math.random().toString(32).substr(2, 16);
}
