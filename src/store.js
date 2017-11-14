'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - STORE
 ***********************************************************************************************************************************************
 * @description
 */
import Data from './data';
import moment from 'moment';
import uuid from 'uuid/v4';
const DEFAULT_KEY = '__contents__';

/**
 * [config description]
 * @type {Object}
 */
export default class Store {
  constructor(data, config={}) {
    const _store = {}
    const _subscriptions = {};

    this.config = Object.assign({}, config);
    this.get = this.get.bind(this, _store);
    this.set = this.set.bind(this, _store);
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
  get(store, key=DEFAULT_KEY) {
    return new Promise((resolve, reject) => {
      if(store[key] instanceof Data) { // eventually check for expiry
        resolve(store[key])
      } else {
        reject(`System.Store - Get - ${store[key]} is not an instance of System.Data`);
      }
    });
  }

  /**
   * Sets data by uri into the store.
   * @param {[type]} store [description]
   * @param {[type]} key   [description]
   * @param {[type]} data  [description]
   */
  set(store, data, key=DEFAULT_KEY) {

    return new Promise((resolve, reject) => {
      if(data instanceof Data) {
          store[key] = data;
          resolve(store[key]);
      } else {
        reject(`System.Store - Set - ${data} is not an instance of System.Data`);
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
}
