'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - MODEL
 ***********************************************************************************************************************************************
 * @description
 */
import joi from 'joi';
import Utils from './utils';
import _ from 'lodash';

/**
 * Model Class
 */
export default class ModelBase {
  constructor(schema={}, config={}) {
    this.config = Object.assign({name: 'Model'}, config);
    this.schema = joi.object().keys(schema);
    this.instance = Utils.fn(this.config.name, Instance);
    this.failed = [];

    /**
     * Dynamic Factory instance
     * @param  {Object} [data={}] [description]
     * @return {[type]}           [description]
     */
    let factory = (function Model(data={}) {
      let {error, value} = joi.validate(data, this.schema);

      if(error) {
        this.failed.unshift(error);
      }

      return new this.instance(value, error);
    }).bind(this);

    Object.defineProperty(factory, 'schema', {value: this.schema, writable: false});
    Object.defineProperty(factory, 'config', {value: this.config, writable: false});
    Object.defineProperty(factory, 'failed', {get: () => [].concat(this.failed)});
    Object.defineProperty(factory, 'clear', {value: this.clear.bind(this), writable: false});

    return factory;
  }

  clear() {
    this.failed.length = 0;
  }
}

/**
 * Dynamic Instance wrapper.
 * @param       {Object} [data={}] [description]
 * @param       {[type]} error     [description]
 * @constructor
 */
function Instance(data={}, error) {
  Object.assign(this, data);

  Object.defineProperty(this, '__error', {
    enumerable: false,
    configurable: false,
    get: () => { return error; }
  })
}
