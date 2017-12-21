'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - SYSTEM - ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from 'continuum';
import Identity from './identity';
import Access from './access';

/**
 * Wraps Continuum.Router to provide custom auth and acl checks.
 */
export default class Router extends Continuum.Router {
  constructor() {
    super();
  }

  /**
   * Locks The view down based on 'authentication';
   * @param  {[type]} view   [description]
   * @param  {[type]} router [description]
   * @return {[type]}        [description]
   */
  protect(view, router) {
    console.log(view, router)
  }

  /**
   * Here we know _who_ the user is, now to check to see if they can access this view.
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  restrict(view) {
    return true;
  }
}
