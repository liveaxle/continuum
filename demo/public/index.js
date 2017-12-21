'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - PUBLIC
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from 'continuum';
import Router from '~/system/router';
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
const views = [
  new View('/', home, {protected: false, transition: true})
];

//
// ROUTER INIT
//------------------------------------------------------------------------------------------//
// @description
//
const router = new Router().register(views).start();
