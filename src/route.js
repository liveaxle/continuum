'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - ROUTE
 ***********************************************************************************************************************************************
 * @description
 */

module.exports = class Route {
  constructor(path='/', handler=()=>{}, config={}) {
    this.config = Object.assign({
      protected: true,
      restricted: true
    }, config);

    this.path = path;
    this.handler = handler;
    this.strategies = {protected: this.protect, restricted: this.restrict};
  }

  /**
   * [protect description]
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  protect(router) {
    return new Promise((resolve, reject) => {
      reject(`Continuum:Route - [${router.get()}] is marked as protected. Continuum does not enforce any authentication system. See the project wiki for more information.`)
    });
  }

  /**
   * [restrict description]
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  restrict(router) {
    return new Promise((resolve, reject) => {
      reject(`Continuum:Route - [${router.get()}] is marked as restricted. Continuum does not enforce any access control system. See the project wiki for more information.`);
    });
  }

  /**
   * Parses View strategies and ultimately invokes the view's render function.
   * @param  {[type]} router [description]
   * @param  {[type]} view   [description]
   * @return {[type]}        [description]
   */
  load(router, params) {
    let strategies = Object.keys(this.strategies).filter(strategy => this.config[strategy])
      .map(strategy => this.strategies[strategy](router, params));

    Promise.all(strategies)
      .then(() => this.handler(params))
      .catch(e => {console.error(`Continuum:Router - Error loading route: ${router.get()} - ${e}`)}); // move to debug module

    return this;
  }
}
