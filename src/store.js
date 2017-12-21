'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - STORE
 ***********************************************************************************************************************************************
 * @description
 */
const moment = require('moment');
const uuid = require('uuid/v4');
const utils = require('./utils');
const _ = require('lodash');

/**
 * [config description]
 * @type {Object}
 */
module.exports = class Store {
  constructor(config={}, data) {
    const _store = {data: null, map: {}};
    const _subscriptions = {};
    const _writers = {};
          _writers[Array] = prepareArrayData.bind(this);
          _writers[Object] = prepareObjectData.bind(this);

    this.config = Object.assign({type: Object, key: 'continuum.key'}, config);
    this.get = this.get.bind(this, _store);
    this.set = this.set.bind(this, _store, _writers);
    this.remove = this.remove.bind(this, _store, _writers);
    this.clear = this.clear.bind(this, _store);
    this.subscribe = this.subscribe.bind(this, _subscriptions);
    this.dispatch = this.dispatch.bind(this, _subscriptions);

    if(data) {
      this.set(data);
    }
  }

  /**
   * Gets data by uri from store.
   * @param  {[type]} store [description]
   * @param  {[type]} key   [description]
   * @return {[type]}       [description]
   */
  get(store) {
    return new Promise((resolve, reject) => {
      console.log(store)
      if(store.data) { // eventually check for expiry
        resolve(store.data)
      } else {
        reject(`Continuum:Store - Get - Store is empty.`);
      }
    });
  }

  /**
   * Sets data by uri into the store.
   * TODO: break out into strategies
   * @param {[type]} store [description]
   * @param {[type]} key   [description]
   * @param {[type]} data  [description]
   */
  set(store, writers, data, config={}) {
    let spec = Object.assign(this.config, config);

    return new Promise((resolve, reject) => {
      // Array data into Array store flow.
      if(data && _.isArrayLike(data) && spec.type === Array) {
        if(spec.append) {
          store.data = store.data.concat(writers[this.config.type](data));
        }else if(spec.prepend) {
          store.data = (writers[this.config.type](data)).concat(store.data);
        } else {
          store.data = writers[this.config.type](data);
        }

        store.map = this.map(data);
        return resolve(store.data);
      }

      // Object data into array store flow
      if(data && _.isObjectLike(data) && spec.type === Array) {
        if(data[this.config.key]) {
          // Data has been in store already, update correct store member
          let index = store.map[data[this.config.key]];

          if(index) {
            store.data[index] = data;
          } else {
            if(spec.prepend) {
              store.data.unshift(data);
            } else {
              store.data.push(data);
            }
          }
        } else {
          // data has not been in the store yet
          let obj = writers[Object](data);

          if(spec.prepend) {
            store.data.unshift(obj);
          } else {
            store.data.push(obj);
          }
        }
        store.map = this.map(store.data);
        return resolve(store.data);
      }

      // Object data into Object store flow.
      if(data && _.isObject(data) && spec.type === Object) {
        if(!data[this.config.key]) {
          data = writers[Object](data);
        }

        if(spec.merge) {
          _.defaultsDeep(store.data, data);
        } else {
          store.data = data;
        }

        return resolve(store.data);
      }

      if(data === undefined || data === null) {
        return reject(`Continuum:Store - Set - data given to write is null or undefined. If you wish to empty the store please use Store.clear.`);
      }

    });
  }

  /**
   * Resets the contents of the store to an empty value of the configured type,
   * ie: [] or {}
   * @param  {[type]} store [description]
   * @return {[type]}       [description]
   */
  clear(store) {
    return new Promise((resolve, reject) => {
      let types = {};
          types[Array] = [];
          types[Object] = {};

      store.data = types[this.config.type];

      resolve(store.data);
    });
  }

  /**
   * Removes an item from the store
   * @param  {[type]} store [description]
   * @return {[type]}       [description]
   */
  remove(store, writers, data) {
    return new Promise((resolve, reject) => {
      // if the data object, and tyope is array,
      // check if key, then remove, if no key, then reject, data not in store to Remove
      // if data is array, run above check LATER
      // if data is object and type is object, just return this.clear
      if(data !== null && data !== undefined) {
        if(_.isObjectLike(data) && this.config.type === Array) {
          if(data[this.config.key]) {
            let index = store.map[data[this.config.key]];
            store.data.splice(index, 1);
            store.map = this.map(store.data);
            resolve(store.data);
          } else {
            reject(`Continuum:Store - remove - ${data} - does not exist in store [key not found].`);
          }
        } else if(_.isObjectLike(data) && this.config.type === Object) {
          return this.clear();
        }
      } else {
        reject(`Continuum:Store - remove - cannot remove null or undefined from store.`);
      }
    });
  }

  /**
   * Subscribe to a domain content change.
   * @param  {[type]}   subscriptions [description]
   * @param  {Function} fn            [description]
   * @return {[type]}                 [description]
   */
  subscribe(subscriptions, fn) {
    let sub = uuid();

    subscriptions[sub] = fn;

    return {
      cancel: () => {
        delete subscriptions[sub];
      }
    }
  }

  /**
   * Broadcasts changes to the store.
   * @param  {[type]} subscriptions [description]
   * @return {[type]}               [description]
   */
  dispatch(subscriptions={}, data) {
    Object.keys(subscriptions).forEach(sub => subscriptions[sub](data));
    return data;
  }

  map(data=[]) {
    let obj = {};

    data.forEach((n, i) => {
      obj[n[this.config.key]] = i+'';
    });

    return obj;
  }
}

//
// FORMATTERS
//------------------------------------------------------------------------------------------//
// @description
//
function prepareArrayData(data) {
  return data.map(prepareObjectData.bind(this));
}

function prepareObjectData(data={}, idx) {
  Object.defineProperty(data, 'continuum.key', {enumerable:false, configurable:false, value: uuid()});
  return data;
}
