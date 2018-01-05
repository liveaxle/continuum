'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - STORE
 ***********************************************************************************************************************************************
 * @description
 */
const moment = require('moment');
const uuid = require('uuid/v4');
const utils = require('./utils');

/**
 * Store Instance
 * @type {Object}
 */
module.exports = class Store {
  constructor(config={}, data) {
    const _store = {data: null}; // Store memory construct.
    const _subscriptions = {}; // Subscriptions store.

    //
    // CLass Members
    //------------------------------------------------------------------------------------------//
    // @description
    //
    this.config = Object.assign({type: Object}, config);
    this.get = this.get.bind(this, _store);
    this.set = this.set.bind(this, _store);
    this.clear = this.clear.bind(this, _store);
    this.subscribe = this.subscribe.bind(this, _subscriptions);
    this.dispatch = this.dispatch.bind(this, _subscriptions, _store);

    //
    // Store instance init.
    //------------------------------------------------------------------------------------------//
    // @description
    //

    // If data was given to the constructor, set it now.
    if(data) {
      this.set(data);
    }

  }

  /**
   * Returns store data.
   * @param  {[type]} store [description]
   * @param  {[type]} key   [description]
   * @return {[type]}       [description]
   */
  get(store) {
    return store.data;
  }

  /**
   * Writes to the store by Type configuration.
   * @param {[type]} store [description]
   * @param {[type]} key   [description]
   * @param {[type]} data  [description]
   */
  set(store, data, config={}) {
    // Break early if data is falsey
    if(data === undefined || data === null) {
      throw new Error(`Continuum:Store - Set - data given to write is null or undefined. If you wish to empty the store please use Store.clear.`);
    }

    store.data = data;

    return this;
  }

  /**
   * Resets the contents of the store to an empty value of the configured type,
   * ie: [] or {}
   * @param  {[type]} store [description]
   * @return {[type]}       [description]
   */
  clear(store) {
    store.data = null;
    return this;
  }

  /**
   * Subscribe to a store change
   * @param  {[type]}   subscriptions [description]
   * @param  {Function} fn            [description]
   * @return {[type]}                 [description]
   */
  subscribe(subscriptions, fn) {
    let sub = uuid();

    subscriptions[sub] = fn;

    // Return an object with this instance as the prototype
    // with an added cancel function.
    const api = Object.create(this);
          api.cancel = () => { delete subscriptions[sub]; }

    return api;
  }

  /**
   * Broadcasts store changes to users.
   * @param  {[type]} subscriptions [description]
   * @return {[type]}               [description]
   */
  dispatch(subscriptions={}, store, data) {
    Object.keys(subscriptions).forEach(sub => subscriptions[sub](data || store.data));
    return this;
  }
}
