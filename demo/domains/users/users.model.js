'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - MODEL
 ***********************************************************************************************************************************************
 * @description
 */
import {Model} from 'continuum';
import Joi from 'joi';

/**
 * USER MODEL
 */
export default new Model('User', {
  first_name: Joi.string().required().default(''),
  last_name: Joi.string().required().default(''),
  age: Joi.number().required().default(0),
  phone: Joi.string().default('555.555.5555'),
  address: Joi.string().default('1234 Easy Street'),
  city: Joi.string().default('Anytown')
}, {});
