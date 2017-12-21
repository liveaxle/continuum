'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS
 ***********************************************************************************************************************************************
 * @description
 */
import {Domain} from 'continuum';
import Service from './users.service';
import Store from './users.store';
import Model from './users.model';
import Resource from './users.resource';
import Components from './users.components';

/**
 * Users Domain instance
 */
export default new Domain('users', {Service, Store, Model, Resource, Components});
