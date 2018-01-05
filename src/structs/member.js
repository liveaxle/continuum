'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - STRUCTS - MEMBER
 ***********************************************************************************************************************************************
 * @description
 */
const uuid = require('uuid/v4');
const _ = require('lodash');

 /**
  * Member
  * @description Serves as the data wrapper for struct items, to help ensure consistency
  *              accross data types that are saved to the struct.
  * @type {[type]}
  */
 module.exports = class Member {
   constructor(data, config) {
     let key = uuid();

     if(_.isObjectLike(data) || _.isArrayLike(data)) {
       // Override instance key with existing key
       if(data[config.key]) { key = data[config.key]}
         else {
           // TODO: test to make sure object.defineProperty works on arrays (it should)
           Object.defineProperty(data, config.key, {enumerable: false, writeable: false, value: key});
         }
       // Add key straight to object
     } else if(!data) {
       // if primitive, issue warning TODO: check for "debug" mode later.
       throw new Error(`Continuum:Structs:Collection - attempting to create Collection Member from a null or undefined value.`);
     } else {
       console.warn(`Continuum:Structs:Collection - Saving Primitive [${data}] to store. There is no way to track primitives (making updating this exact index:value later will be impossible.)`)
     }

     // Add key to member instance as non-writeable property.
     Object.defineProperty(this, config.key, {enumerable: false, writeable: false, value: key});
     // Add data as unwriteable while in Member instance
     Object.defineProperty(this, 'data', {enumerable: false, writeable:false, get: () => { return data}});
   }
 }
