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
     if(!data) {
       throw new Error(`Continuum:Structs:Member - attempting to create Structs Member from a null or undefined value.`);
     }

     let types = {
       Object: _.isObject(data),
       Array: _.isArrayLikeObject(data)
     };

     let strategies = {
       Object: this.object.bind(this),
       array: this.array.bind(this),
       default: this.default.bind(this)
     };

     let contents;
     let strategy = Object.keys(types).filter(type => types[type])[0];

     // Member set up
     this.config = Object.assign({mutable: true, key: 'continuum.key'}, config);
     const key = data[this.config.key] || uuid();

     // Add key to member instance as non-writable property.
     Object.defineProperty(this, this.config.key, {enumerable: false, writable: false, value: key});
     // Add data as unwritable while in Member instance
     Object.defineProperty(this, 'data', {enumerable: false, configurable: false, get: () => contents});
     // Build contents
     contents = (strategies[strategy] || this.default)(data);
   }

   /**
    * Object member
    * @param  {Object} [data={}] [description]
    * @return {[type]}           [description]
    */
   object(data={}) {
     let obj = Object.create(data);

     Object.keys(data).forEach(key => {
       Object.defineProperty(obj, key, {enumerable: true, writable: this.config.mutable, value: data[key]});
     });

     Object.defineProperty(obj, this.config.key, {enumerable: false, writable: false, value: this[this.config.key]});

     return obj;
   }

   /**
    * Array Member
    * @param  {Array}  [data=[]] [description]
    * @return {[type]}           [description]
    */
   array(data=[]) {
     Object.defineProperty(data, this.config.key, {enumerable: false, writable: false, value: this.key});
     return data;
   }

   /**
    * Default Member
    * @param  {String} [data=''] [description]
    * @return {[type]}           [description]
    */
   default(data='') {
     console.warn(`Continuum:Structs:Collection - Saving Primitive [${data}] to store. There is no way to track primitives (making updating this exact index:value later will be impossible.)`);
     return data;
   }
 }
