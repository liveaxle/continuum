'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - RESOURCE - RESPONSE
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * Response wrapper
 * Will include validation/normalization, etc
 */
module.exports = class Response {
  constructor(response) {
    this.data = response.data;

    Object.defineProperty(this, 'config', {value: Object.assign({}, response.config || {}), writable: false, enumerable: false});
    Object.defineProperty(this, 'status', {value: response.status, writable: false, enumerable: false});
    Object.defineProperty(this, 'headers', {value: response.headers || {}, writable: false, enumerable: false});
  }
}
