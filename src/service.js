'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */


/**
 * The main purpose of this class is to provide fallbacks so
 * the runtime wont diaf.
 */
module.exports = class Service {
  constructor(config={}) {
    this.config = Object.assign({}, config);
  }

  /**
   * Inbound transformation stub.
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  inbound(data) {
      return data;
  }

  /**
   * Outbout transformation stub.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  outbound(data) {
    return data;
  }
}
