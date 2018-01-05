'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - STORE
 ***********************************************************************************************************************************************
 * @description
 */
import {Store} from 'continuum';

/**
 * Users store
 */
const Users = new Store();
      Users.User = new Store();

/**
 * Users store export.
 */
export default Users;
