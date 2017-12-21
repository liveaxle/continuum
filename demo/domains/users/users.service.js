'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import {Service} from 'continuum';

/**
 * Users service instance
 * @type {Service}
 */
const Users = new Service();

/**
 * Inbound transform moment.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Users.inbound = function(data) {
  return data;
};

/**
 * Users outbound moment.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Users.outbound = function(data) {
  return data;
};

/**
 * Users service export
 */
export default Users;
