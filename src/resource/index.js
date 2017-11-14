'use strict';

/***********************************************************************************************************************************************
 * SYSTEM RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
import Axios from 'axios';
import path from 'path';
import Response from './response';

/**
 * System Resource -
 * HTTP client
 * @type {String}
 */
export default class Resource {
  constructor(name='', config={}) {
    this.server = process.env.API;
    this.resource = name || config.path;

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
    return `${this.server}/${config.uri || this.resource}/${process.env.CODE || ''}`;
  }
}
