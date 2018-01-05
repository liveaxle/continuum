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
const Users = new Store({type: Array, flatten: true});
Users.User = new Store({type: Object});
export default Users;
