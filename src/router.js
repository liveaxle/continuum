'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
const Director = require('director/build/director');
const Pattern = require('url-pattern');

/**
 * Create a singleton, private instance of the router
 * @type {Director}
 */
const _router = new Director.Router();


/**
 * Router class that exists basically for the
 * puposes for chaining.
 * @type {[type]}
 */
module.exports = class Router {
  constructor() {

  }

  /**
   * Sets the current route. (forces a navigation)
   * @param {String} [url='/'] [description]
   */
  set(url='/') {
    _router.setRoute(url);
  }

  /**
   * Gets the current route.
   * @return {[type]} [description]
   */
  get() {
    return _router.getRoute();
  }

  /**
   * Initializes Director
   * @return {[type]} [description]
   */
  start(router, mode='#/') {
    _router.init(mode);
    return this;
  }

  /**
   * Registers a collection of routes
   * @param  {Object} [routes={}] [description]
   * @return {[type]}             [description]
   */
  register(path='/', fn=this.stub) {

    _router.on(path, (params)=>{
      fn(this, this.params.map(path, params))
    });

    return this;
  }

  /**
   * Params getter, api for url param matching
   * Todo - abstract this to a place that can be used by the Resource
   *        class too.
   * @return {[type]} [description]
   */
  get params() {
    return {
      map: mapParamsFromRoute.bind(this)
    }
  }
};


//
// ACCESS FUNCTIONS
//------------------------------------------------------------------------------------------//
// @description
//
/**
 * Builds url params from dynamic segments into a map.
 * ie: registered: /users/:id - visited: /users/10 will return an object of {id: 10};
 *
 * @param  {[type]} path        [description]
 * @param  {Array}  [params=[]] [description]
 * @return {[type]}             [description]
 */
function mapParamsFromRoute(path, params=[]) {
  const map = {};
  const pattern = new Pattern(path, {segmentNameCharset: 'a-zA-Z0-9_-'});

  (pattern.names || []).forEach((name, idx) => {
    map[name] = params[idx];
  });

  return map;
}
