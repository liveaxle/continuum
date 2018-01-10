'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - RESOURCE - RESPONSE
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * Request Class
 * @description Essentially creates a consistent configuration object for Axios requests.
 *              The benefit of this is, if we ever decide to change our HTTP library, we can build
 *              any new configuration here.
 * @type {[type]}
 */
module.exports = class Request {
  constructor(method='get', config={}) {
    this.method = method;
    this.params = config.params || {};
    this.url = config.url || '',
    this.data = config.data || {};
  }
}
