'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import Worker from './worker';
import Response from './resource/response';
import Data from './data';

/**
 * The main purpose of this class is to provide fallbacks so
 * the runtime wont diaf.
 */
export default class Service {
  constructor(config={}) {
    this.config = Object.assign({}, config);
    this.worker = new Worker();
  }

  /**
   * [inbound description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  inbound(response) {
    return (this.inbound.transform || function(data) { return data; })
      (this.validate(response).cast(response.data));
  }

  /**
   * [cast description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  cast(data) {
    return new Data(data);
  }

  /**
   * [validate description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  validate(response) {
      if(!response || !(response instanceof Response)) {
        throw new Error('System.Service - Please provide an instance of System.Response');
      }

      return this;
  }
}

/**
 * Called by a domain whith response data;
 * Figure out how to curry this so instance validation will always be run before
 * it makes its way to any overriding function.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function inbound(data) { console.log('in service', data); return data; }

/**
 * Called by domains with request data.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function outbound(data) { return data; }
