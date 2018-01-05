'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - SERVICE
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from 'continuum';
import Model from './users.model';

/**
 * Users service instance
 * @type {Service}
 */
const Users = new Continuum.Service();


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
