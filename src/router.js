'use strict';

/***********************************************************************************************************************************************
 * SYSTEM - ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
const Director = require('director/build/director');
const Pattern = require('url-pattern');
const View = require('./view');

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
    this.start = start.bind(this, _router);
    this.register = register.bind(this, _router);
    this.render = render.bind(this, _router);
    this.strategies = {protected: this.protect, restricted: this.restrict};
  }

  /**
   * [protect description]
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  protect(view) {
    return new Promise((resolve, reject) => {
      reject(`Continuum:Router - view: [${view.route}] is marked as protected. Continuum does not enforce any authentication system. See the project wiki for more information.`)
    });
  }

  /**
   * [restrict description]
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  restrict(view) {
    return new Promise((resolve, reject) => {
      reject(`Continuum:Router - view: [${view.route}] is marked as restricted. Continuum does not enforce any access control system. See the project wiki for more information.`);
    });
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
 * Initializes Director
 * @return {[type]} [description]
 */
function start(router, mode='#/') {
  router.init(mode);
  return this;
}

/**
 * Registers a collection of routes
 * @param  {Object} [routes={}] [description]
 * @return {[type]}             [description]
 */
function register(router, views=[]) {

  if(views && views.constructor !== Array) {
   views = [views]
  }

  views.filter(view => view instanceof View).forEach(view => {
    router.on(view.route, this.render.bind(this, view));
  });

  return this;
};

/**
 * Parses View strategies and ultimately invokes the view's render function.
 * @param  {[type]} router [description]
 * @param  {[type]} view   [description]
 * @return {[type]}        [description]
 */
function render(router, view) {
  view.transitionStart();

  let strategies = Object.keys(this.strategies).filter(strategy => view.spec[strategy])
    .map(strategy => this.strategies[strategy](view, router));

  Promise.all(strategies)
    .then(view.transitionStop)
    .then(() => view.render(this.params.map(view, Array.apply(null, arguments).slice(2))))
    .catch(e => {console.error(`Continuum:Router - Error loading route: ${view.route} - ${e}`)}); // move to debug module

  return this;
}

/**
 * Builds url params from dynamic segments into a map.
 * ie: registered: /users/:id - visited: /users/10 will return an object of {id: 10};
 *
 * @param  {[type]} view        [description]
 * @param  {Array}  [params=[]] [description]
 * @return {[type]}             [description]
 */
function mapParamsFromRoute(view, params=[]) {
  const map = {};
  const pattern = new Pattern(view.route, {segmentNameCharset: 'a-zA-Z0-9_-'});

  (pattern.names || []).forEach((name, idx) => {
    map[name] = params[idx];
  });

  return map;
}
