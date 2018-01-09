'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DATA - STRUCTS - COLLECTION
 ***********************************************************************************************************************************************
 * @description
 */
const _ = require('lodash');
const Member = require('./member');

/**
 * Collection Instance
 * @param  {Array}  [data=[]] [description]
 * @return {[type]}           [description]
 */
module.exports = class Collection {
  constructor(data=[], config={}) {
    // Cast data to the right structure.
    data = this.validate(data);

    this.config = Object.assign({
      mutable: true,
      key: 'continuum.key',
      prepend: false
    }, config);

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
    config = Object.assign({}, this.config, config);

    // If flatten is true, recurse with array contents;
    if(_.isArrayLikeObject(data) && config.flatten) {
      data.forEach(n => this.write(n, config));
      return this;
    }

    // Pointers
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
    config = Object.assign({}, this.config, config);

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
