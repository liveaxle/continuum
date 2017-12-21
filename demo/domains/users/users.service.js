'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import {Service} from 'continuum';
import Model from './users.model';

/**
 * Users service instance
 * @type {Service}
 */
const Users = new Service();

/**
 * Get Inbound transform moment.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Users.inbound.get = function(data) {
  return data;
};

/**
 * Users outbound moment.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Users.outbound.create = function(data) {
  return Model(data);
};

/**
 * Users service export
 */
export default Users;
