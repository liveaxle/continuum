'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - MODEL
 ***********************************************************************************************************************************************
 * @description
 */
import {Model} from 'continuum';
import Joi from 'joi';
import uuid from 'uuid/v4';

// For Joi
function id() {
  return uuid();
}

id.description = 'Person Id';

/**
 * USER MODEL
 */
export default new Model('User', {
  id: Joi.string().default(id),
  first_name: Joi.string().default(''),
  last_name: Joi.string().default(''),
  age: Joi.number().default(0),
  phone: Joi.string().default('555.555.5555'),
  address: Joi.string().default('1234 Easy Street'),
  city: Joi.string().default('Anytown'),
  created: Joi.date().description('Person Created').default(new Date)
}, {});
