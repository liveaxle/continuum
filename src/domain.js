'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DOMAIN
 ***********************************************************************************************************************************************
 * @description
 */
const Resource = require('./resource');
const Store = require('./store');
const Model = require('./model');
const Service = require('./service');
const uuid = require('uuid/v4');
const joi = require('joi');
const Structs = require('./structs');
const Constants = require('./constants');

/**
 * Domain Class
 */
module.exports = class Domain {
  constructor(name='', members={}, config={}) {
    if(!name) {
      throw new Error(`System Domain - please provide a name for your domain`);
    }

    this.config = Object.assign({type: Object, cache: true, force: false}, config);
    // Domains Constructs
    this.Service = members.Service instanceof Service && members.Service || new Service(this.config);
    this.Resource = members.Resource instanceof Resource && members.Resource || new Resource(name, this.config);
    this.Store = members.Store instanceof Store && members.Store || new Store(this.config);
    this.Model = members.Model || new Model('Model', {}, this.config);
    this.Components = members.Components || {};
    this.Constants = members.Constants || {};

    // Domain Event management.
    this.subscribe = this.Store.subscribe;
    this.dispatch = this.Store.dispatch;

    // Domain Data type
    this.Struct = Structs[Constants.Structs[this.config.type || this.Model.config.type]];

    if(!this.Struct) {
      throw new Error(`Continuum:Domains - Struct - ${this.config.type} is not a valid type for Continuum.Structs. Supported types are found in Continuum.Constants.`);
    }
  }

  /**
   * Retrieval Orchestrator
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  get(config={}) {
    config = Object.assign(this.config, config);

    return new Promise((resolve, reject) => {
      let data = this.Store.get();

      if(data && data instanceof this.Struct && config.cache && !config.force) {
        resolve(data.read(config));
      } else {
        // If store doesn't have, try the API
        this.Resource.get(config)
          // Validate incoming data
          .then(response => this.Model.validate(response.data, config))
          // Process incoming data
          .then(data => this.Service.inbound.get(data))
          // Write data type to the store
          .then(data => {
            if(config.cache) {
              let struct = new this.Struct(data, config);
              return this.Store.set(struct).dispatch(struct.read());
            } else {
              return data
            }
          })
          // Resolve to direct callers
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * Update orchestrator
   * @param  {Object} [data={}]   [description]
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  update(data={}, config={}) {
    config = Object.assign(this.config, config);

    return new Promise((resolve, reject) => {
      this.Resource.put(this.Service.outbound.update(data), config)
        .then(response => this.Service.inbound.update(response, data))
        .then(data => {
          if(config.cache) {
            let struct = this.Store.get(); // Get the current store struct.

            if(struct) {
              // if the store has the struct already, update it
              return struct.write(data, config);
            } else {
              // if not, create a new struct
              return new this.Struct(data, config);
            }
          } else {
            return data
          }
        }).then(data => {
          if(config.cache) {
            this.Store.set(data).dispatch(data.read());
          } else {
            return data;
          }
        })
        .then(resolve)
        .catch(reject)
    });
  }

  /**
   * Create orchestrator
   * @param  {Object} [data={}]   [description]
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  create(data={}, config={}) {
    config = Object.assign(this.config, config);

    return new Promise((resolve, reject) => {
      this.Resource.post(this.Service.outbound.create(data), config)
        .then(response => this.Service.inbound.create(response, data))
        .then(data => {
          if(!config.cache) return data;

          let struct = this.Store.get(); // Get the current store struct.

          if(struct) {
            // if the store has the struct already, update it
            return struct.write(data, config);
          } else {
            // if not, create a new struct
            return new this.Struct(data, config);
          }
        })
        .then(data => {
          if(config.cache) {
            this.Store.set(data).dispatch(data.read());
          } else {
            return data;
          }
        })
        .then(resolve)
        .catch(reject)
    });
  }

  /**
   * Delete Orchestrator
   * @param  {Object} [data={}]   [description]
   * @param  {Object} [config={}] [description]
   * @return {[type]}             [description]
   */
  delete(data={}, config={}) {
    config = Object.assign(this.config, config);

    return new Promise((resolve, reject) => {
      this.Resource.delete(this.Service.outbound.delete(data), config)
        .then(response => {
          if(!config.cache) return response;

          let struct = this.Store.get();

          if(struct) {
            // if the store has the struct already, update it
            return struct.remove(data, config);
          } else {
            // if not, create a new empty struct
            // This Essentially means that someone has called delete on a domain
            // before getting any data, which is unlikely but not impossilbe.
            return new this.Struct(null, config);
          }
        })
        .then(data => {
          if(config.cache) {
            this.Store.set(data).dispatch(data.read());
          } else {
            return data;
          }
        })
        .then(resolve)
        .catch(reject)
    });
  }
}
