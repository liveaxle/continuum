'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
import {Resource} from 'continuum';

/**
 * RESOURCE
 * @type {[type]}
 */
export default new Resource('users', {
  base: process.env.API
});
