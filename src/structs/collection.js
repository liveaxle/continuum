'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DATA - STRUCTS - COLLECTION
 ***********************************************************************************************************************************************
 * @description
 */
const _ = require('lodash');
const uuid = require('uuid/v4');

/**
 * Collection Instance
 * @param  {Array}  [data=[]] [description]
 * @return {[type]}           [description]
 */
module.exports = class Collection {
  constructor(data=[], config=[]) {
    // Cast data to the right structure.
    data = this.validate(data);

    this.config = Object.assign({
      mutable: false,
      key: 'continuum.key'
    });

    // Collection Memory Space
    const collection = {data: data.map(n => new Member(n, this.config))};
          collection.map = this.map(collection.data);

    // Interface partials.
    this.read = this.read.bind(this, collection);
    this.write = this.write.bind(this, collection);
    this.remove = this.remove.bind(this, collection);
  }

  /**
   * Ensure's data is ok to write to the collection.
   * @param  {[type]} data   [description]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  validate(data, config) {
    if(data) {
      if(_.isArrayLike(data)) { return data; }
        else { return [data]; }
    } else {
      return [];
    }
  }

  /**
   * Returns unobfuscated Collection data.
   * @param  {[type]} collection [description]
   * @param  {[type]} query      [description]
   * @return {[type]}            [description]
   */
  read(collection, config={}) {
    return collection.data.map(n => n.data);
  }

  /**
   *  Writes data to the collection.
   * @param  {[type]} collection [description]
   * @param  {[type]} data       [description]
   * @param  {[type]} config     [description]
   * @return {[type]}            [description]
   */
  write(collection, data, config={}) {
    if(!data) {
      throw new Error(`Continuum:Structs:Collection - write - "data" is null or undefined`);
    }

    // Merge JIT config
    config = Object.assign(this.config, config);

    let member = new Member(data, config);
    let key = member[this.config.key];
    let index = collection.map[key];

    // If the item is a member in the collection already.
    if(key && (index !== undefined && index !== null)) {
      collection.data[index] = member;
    } else {
      // the item may have a key but does not exist in the Collection
      if(config.prepend) { collection.data.unshift(member); }
        else { collection.data.push(member); }

      // Rebuild collection map.
      collection.map = this.map(collection.data);
    }

    return this;
  }

  /**
   * Removes a member from the Collection
   * @param  {[type]} data   [description]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  remove(collection, data, config) {
    config = Object.assign(this.config, config);

    let member = new Member(data, config);
    let key = member[this.config.key];
    let index = collection.map[key];

    // If the item is a member in the collection already.
    if(key && (index !== undefined || index !== null)) {
       collection.data.splice(index, 1);
       collection.map = this.map(collection.data);
    } else {
      console.warn(`Continuum:Structs:Collection - Remove - ${data} was not found in Collection. Ignoring.`);
    }

    return this;
  }

  /**
   * Turns collection members into a map by config.key for O(1) lookup.
   * @param  {Array}  [data=[]] [description]
   * @return {[type]}           [description]
   */
  map(data=[]) {
    let map = {};

    data.forEach((n, i) => map[n[this.config.key]] = i);

    return map;
  }
}

/**
 * Member
 * @description Serves as the data wrapper for collection items, to help ensure consistency
 *              accross data types that are saved to the collection.
 * @type {[type]}
 */
class Member {
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
