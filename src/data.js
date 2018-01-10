'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DATA
 ***********************************************************************************************************************************************
 * @description Provides common data manipulation functionality.
 */
const _ = require('lodash');

/**
 * Turns an Array into a Map based on key configuration.
 * @param  {[type]} data [description]
 * @param  {[type]} key  [description]
 * @return {[type]}      [description]
 */
function mapify(data=[], map={}) {
  let mapping = {}

  if(!data  || data.constructor !== Array) {
    throw new Error(`Continuum:Data - Mapify - This function is intended to convert Array instance data into a map was given: ${data} - instead`);
  }

  if(!map) {
    throw new Error(`Continuum:Data - Mapify - This function is intended to convert Array instance data into a map by a given map, was given: ${map} - instead`);
  }

  // Build top level map items
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

/**
 * Turns the contents of an object into an array
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function arrayify(obj={}, config={}) {
    if(!obj || obj && obj.constructor !== Object) {
      throw new Error(`Continuum:Data - Arrayify: Requires an object. Got: ${obj}`)
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
 * Data Export
 * @type {[type]}
 */
module.exports = {mapify, arrayify};
