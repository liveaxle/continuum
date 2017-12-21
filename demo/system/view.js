'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - SYSTEM - VIEW
 ***********************************************************************************************************************************************
 * @description
 */
import Continuum from 'continuum';
import React from 'react';
import Dom from 'react-dom';
import Constants from '~/system/constants';

/**
 * Wraps the Continuum.View class to provide the react specific way to render something.
 * So if we ever decide to change rendering libraries, we can just change what the render function
 * does without Continuum being prescriptive.
 * @type {[type]}
 */
export default class View extends Continuum.View {
  constructor(route, component, spec) {
    super(route, spec);
    this.component = component;
  }

  /**
   * Render
   *
   * Overrides the Continuum.View render method with our React render method.
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  render(params) {
   this.instance = Dom.render(<this.component params={params} />, document.getElementById(Constants.mountpoint));
  }

  /**
   * Starts our view transition.
   * @return {[type]} [description]
   */
  transitionStart() {
    if(!this.spec.transition) return;

    console.log('transition started');
  }

  /**
   * Stops our view transition.
   * @return {[type]} [description]
   */
  transitionStop() {
    if(!this.spec.transition) return;

    console.log('transition stopped');
  }
}
