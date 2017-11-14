'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - DOMAIN
 ***********************************************************************************************************************************************
 * @description
 */
import Resource from './resource';
import Store from './store';
import Model from './model';
import Service from './service';
import uuid from 'uuid/v4';
import joi from 'joi';


/**
 * Domain Class
 */
export default class Domain {
  constructor(name='', members={}, config={}) {
    if(!name) {
      throw new Error(`System Domain - please provide a name for your domain`);
    }

    // Domains Constructs
    this.Service = members.Service instanceof Service && members.Service || new Service(config);
    this.Resource = members.Resource instanceof Resource && members.Resource || new Resource(name, config);
    this.Store = members.Store instanceof Store && members.Store || new Store(config);
    this.Model = members.Model || new Model({});
    this.Components = members.Components || {};
    this.Constants = members.Constants || {};

    // Domain Event management.
    this.subscribe = this.Store.subscribe;
    this.dispatch = this.Store.dispatch;
  }

  /**
   * Retrieval Orchestrator
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  get(config={}) {
    return new Promise((resolve, reject) => {
      let url = this.Resource.uri(config);

      // See if the Store has it first
      this.Store.get()
        .then(resolve, (err) => {
          // If store doesn't have, try the API
          this.Resource.get(config)
            // Process incoming data
            .then(data => this.Service.inbound(data))
            // Write it to the store
            .then(data => this.Store.set(data))
            // Dispatch change events
            .then(this.dispatch)
            // Resolve to direct callers
            .then(resolve);
        }).catch(reject); // add system-wide custom class
    });
  }
}
