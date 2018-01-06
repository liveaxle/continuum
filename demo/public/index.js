'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from 'continuum';
import Route from '~/system/route';
import View from '~/system/view';


//
// VIEWS
//------------------------------------------------------------------------------------------//
// @description
//
import home from './home';

/**
 * View List - gets passed to router for binding.
 * @type {Array}
 */
const views = {
  '/': new View(home)
};

/**
 * Access rules for each route.
 * @type {Object}
 */
const rules = {
  '/': {protected: false, restricted: false}
};

/**
 * Application Routes
 * @type {[type]}
 */
const routes = Object.keys(views)
  .map(view => new Route(
    view,
    views[view].render.bind(views[view]),
    rules[view]));

//
// ROUTER INIT
//------------------------------------------------------------------------------------------//
// @description
//
const router = new Continuum.Router();

// Register each route.
routes.forEach(route => router.register(route.path, route.load.bind(route)));

// Start the router.
router.start();
