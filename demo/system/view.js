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
 * Wraps the Continuum.View class to provide the react configific way to render something.
 * So if we ever decide to change rendering libraries, we can just change what the render function
 * does without Continuum being prescriptive.
 * @type {[type]}
 */
export default class View extends Continuum.View {
  constructor(component, config={}) {
    super(component, config);

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
   this.instance = Dom.render(<this.component params={params} view={this}/>, document.getElementById(Constants.mountpoint));
  }

  /**
   * Starts our view transition.
   * @return {[type]} [description]
   */
  transitionStart() {
    if(!this.config.transition) return;

    console.log('transition started');
  }

  /**
   * Stops our view transition.
   * @return {[type]} [description]
   */
  transitionStop() {
    if(!this.config.transition) return;

    console.log('transition stopped');
  }
}
