'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
const Axios = require('axios');
const path = require('path');
const Response = require('./response');

/**
 * System Resource -
 * HTTP client
 * @type {String}
 */
module.exports = class Resource {
  constructor(name='', config={}) {
    this.server = config.base || '[Continuum:Resource - no base resource url provided. please see wiki]';
    this.resource = name || config.path || config.uri;

    if(!this.resource) {
      throw new Error(`System.Resource - please provice a resource name to use`);
    }
  }

  /**
   * Axios HTTP GET wrapper
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  get(config={}) {
    return Axios.get(this.uri(config), {params: config.params}).then(res => new Response(res));
  }

  /**
   * Simple help for building resource paths
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  uri(config={}) {
    return `${this.server}/${config.uri || config.url || this.resource}`;
  }
}
