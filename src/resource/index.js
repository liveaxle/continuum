'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
const Axios = require('axios');
const path = require('path');
const Response = require('./response');
const Pattern = require('url-pattern');

/**
 * System Resource -
 * HTTP client
 * @type {String}
 */
module.exports = class Resource {
  constructor(name='', config={}) {
    this.server = config.base || '[Continuum:Resource - no base resource url provided. please see wiki]';
    this.resource = name || config.path || config.uri;
    this.methods = Object.assign({
      get: '',
      put: '/:id',
      post: '',
      delete: '/:id'
    }, config.methods || {});

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
    return Axios.get(this.uri(config.segments || {}, config, this.methods['get']), config).then(res => new Response(res));
  }

  /**
   * Axios HTTP PUT wrapper
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  put(data={}, config={}) {
    return Axios.put(this.uri(data, config, this.methods['put']), data, config).then(res => new Response(res));
  }

  /**
   * Axios HTTP POST wrapper
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  post(data={}, config={}) {
    return Axios.post(this.uri(data, config, this.methods['post']), data, config).then(res => new Response(res));
  }

  /**
   * Axios HTTP DELETE wrapper
   * @param  {Object} [data={}]   [description]
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  delete(data={}, config={}) {
    return Axios.delete(this.uri(data, config, this.methods['delete']), data, config).then(res => new Response(res));
  }

  /**
   * Simple help for building resource paths
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  uri(data={}, config={}, pattern='') {
    let endpoint = `${config.url || this.resource}${pattern}`;

    if(config.uri) {
      endpoint += `/${config.uri}`;
    }

    return `${this.server}/${buildSegmentsFromData(data, endpoint)}`;
  }
}

//
// RESOURCE HELPERS
//------------------------------------------------------------------------------------------//
// @description
//
function buildSegmentsFromData(data, pattern='') {
  let segments = new Pattern(pattern, {segmentNameCharset: 'a-zA-Z0-9_-'}).names;

  segments.forEach(seg => {
    pattern = pattern.replace(`:${seg}`, data[seg]);
  });

  return pattern;
}
