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

    this.config = Object.assign({type: Object}, config);
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

      if(data && data instanceof this.Struct) {
        resolve(data.read(config));
      } else {
        // If store doesn't have, try the API
        this.Resource.get(config)
          // Validate incoming data
          .then(response => this.Model.validate(response.data, config))
          // Process incoming data
          .then(data => this.Service.inbound.get(data))
          // Write data type to the store
          .then(data => this.Store.set(
            new this.Struct(data, config)
          ))
          // Dispatch change events
          .then(store => {
            return store.dispatch(store.get().read(config));
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
          let struct = this.Store.get(); // Get the current store struct.

          if(struct) {
            // if the store has the struct already, update it
            return struct.write(data, config);
          } else {
            // if not, create a new struct
            return new this.Struct(data, config);
          }
        }).then(struct => {
          // write the struct to the store
          return this.Store.set(struct);
        })
        // dispatch struct data.
        .then(store => this.dispatch(store.get().read()))
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
          let struct = this.Store.get(); // Get the current store struct.
          console.log(data)
          if(struct) {
            // if the store has the struct already, update it
            return struct.write(data, config);
          } else {
            // if not, create a new struct
            return new this.Struct(data, config);
          }
        })
        .then(struct => this.Store.set(struct))
        .then(store => this.dispatch(this.Store.get().read()))
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
      this.Resource.delete(data, config)
        .then(response => this.Store.get())
        .then(struct => {
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
        .then(struct => this.Store.set(struct))
        .then(store => this.dispatch(this.Store.get().read()))
        .then(resolve)
        .catch(reject)
    });
  }
}
