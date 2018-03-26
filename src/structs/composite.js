'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DATA - STRUCTS - COMPOSITE
 ***********************************************************************************************************************************************
 * @description The composite struct is to manage working with Objects in a consistent way.
 */
const _ = require('lodash');
const Member = require('./member');
const Constants = require('../constants');

module.exports = class Composite {
  constructor(data={}, config={}) {

    // Cast data to the right structure.
    data = this.validate(data) || {};

    this.config = Object.assign({
      mutable: true,
      key: Constants.defaults.data.key
    }, config);

    const composite = {contents: new Member(data, this.config)};

    // Interface partials.
    this.read = this.read.bind(this, composite);
    this.write = this.write.bind(this, composite);
    this.remove = this.remove.bind(this, composite);
  }

  /**
   * Ensures data is ok to write to the composite.
   * @param  {[type]} data   [description]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  validate(data, config) {
    if(data && _.isObjectLike(data) && !_.isArrayLike(data)) {
      return data;
    } else {
      console.warn(`Continuum:Structs:Composite - Validate - ${typeof data} is not an object.`);
      return null;
    }
  }

  /**
   * Returns unobfuscated composite data.
   * @param  {[type]} composite  [description]
   * @param  {[type]} query      [description]
   * @return {[type]}            [description]
   */
  read(composite, config={}) {
    return composite.contents.data || {};
  }

  /**
   *  Writes data to the composite.
   * @param  {[type]} composite  [description]
   * @param  {[type]} data       [description]
   * @param  {[type]} config     [description]
   * @return {[type]}            [description]
   */
  write(composite, data, config={}) {
    config = Object.assign({}, this.config, config);
    // If mutable is set to false, data will not be overwritten.
    if (!config.mutable) {
      console.warn(`Continuum:Structs:Composite - Write - Cannot write data to a composite with config.mutable set to false.`);
      return this;
    }
    // Ensure that method has been passed valid data. If not, data will not be overwritten.
    if (!this.validate(data)) {
      console.warn(`Continuum:Structs:Composite - Write - Attempted to overwrite composite data with an invalid data type - ${typeof data}`);
      return this;
    }
    // If merge is true, incoming properties will be added to existing data.
    // Otherwise existing data will be replaced with incoming.
    if (config.merge) {
      data = Object.assign({}, this.read(), data);
    }
    composite.contents = new Member(data, config);
    return this;
  }

  /**
   * Clears the composite's data.
   * @param  {[type]} data   [description]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  remove(composite, data, config) {
    composite.contents = new Member({});
    return this;
  }
}
