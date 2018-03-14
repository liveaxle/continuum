'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
const Axios = require('axios');
const path = require('path');
const Response = require('./response');
const Request = require('./request');
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

    // Request wrapper bindings.
    this.get = request.bind(this, 'get');
    this.put = request.bind(this, 'put');
    this.post = request.bind(this, 'post');
    this.delete = request.bind(this, 'delete');

    // set http config to default instance config
    this.config = Object.assign({
      withCredentials: false
    }, config.http || {});
  }

  /**
   * Builds a fully qualified URL
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  url(data={}, config={}, pattern='') {
    let endpoint = `${config.url || this.resource}${pattern}`;

    if(config.uri) {
      endpoint += `/${config.uri}`;
    }

    return `${this.server}/${translatePatternSegments(data, endpoint)}`;
  }
}

//
// Request Wrapper
//------------------------------------------------------------------------------------------//
//

/**
 * Serves as a single point of entry to all HTTP requests.
 * @param  {String} [method='get'] [description]
 * @param  {Object} [config={}]    [description]
 * @param  {[type]} data           [description]
 * @return {[type]}                [description]
 */
function request(method='get', config={}, data) {
  config = Object.assign({}, this.config, config);
  config.url = this.url(data || config.segments, config, this.methods[method]);
  config.data = data;

  return Axios(new Request(method, config)).then(data => new Response(data));
}

//
// RESOURCE HELPERS
//------------------------------------------------------------------------------------------//
// @description
//

/**
 * Takes a url pattern such as: /users/:id (modeled after express.js) and examines the given
 * object for a matching key wherein it will supplant the value for the placeholder. Uses 'url-pattern'
 * for the regex.
 * @param  {[type]} data         [description]
 * @param  {String} [pattern=''] [description]
 * @return {[type]}              [description]
 */
function translatePatternSegments(data, pattern='') {
  let segments = new Pattern(pattern, {segmentNameCharset: 'a-zA-Z0-9_-'}).names;

  segments.forEach(seg => {
    pattern = pattern.replace(`:${seg}`, data[seg]);
  });

  return pattern;
}
