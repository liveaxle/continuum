'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - RESOURCE - RESPONSE
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * Response wrapper
 * Will include validation/normalization, etc
 */
export default class Response {
  constructor(response) {
    this.data = response.data;
    this.__proto__.config = Object.assign({}, response.config || {});
    this.__proto__.status = response.status;
    this.__proto__.headers = response.headers || {};
  }
}
