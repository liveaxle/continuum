'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - CONSTANTS
 ***********************************************************************************************************************************************
 * @description
 */
const CONSTANTS = {};

//
// STRUCTS CONSTANTS
//------------------------------------------------------------------------------------------//
// @description
//

CONSTANTS.Structs = {};
CONSTANTS.Structs[Array] = 'Collection';
CONSTANTS.Structs[Object] = 'Composite';


//
// DEFAULTS
//------------------------------------------------------------------------------------------//
// @description
//
CONSTANTS.defaults = {
  data: {
    key: 'continuum.key'
  }
};

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = CONSTANTS;
