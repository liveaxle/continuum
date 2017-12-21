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

    //
    // TRANSFORMS
    //------------------------------------------------------------------------------------------//
    // @description
    //
    this.inbound = {
      get: getInboundTransform.bind(this),
      create: createInboundTransform.bind(this),
      update: updateInboundTransform.bind(this)
    };

    this.outbound = {
      create: createOutboundTransform.bind(this),
      update: updateOutboundTransform.bind(this),
      delete: deleteOutboundTransform.bind(this)
    };
  }
}

//
// TRANFORM STUBS
//------------------------------------------------------------------------------------------//
// @description
//

/**
 * Get Inbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function getInboundTransform(data) {
  return data;
}

/**
 * Create Inbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function createInboundTransform(response, data) {
  return data;
}

/**
 * update Inbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function updateInboundTransform(response, data) {
  return data;
}

/**
 * Create Outbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function createOutboundTransform(data) {
  return data;
}

/**
 * Update Outbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function updateOutboundTransform(data) {
  return data;
}

/**
 * Delete Outbound
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function deleteOutboundTransform(data) {
  return data;
}
