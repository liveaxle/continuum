'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - VIEW
 ***********************************************************************************************************************************************
 * @description
 */

/**
 * [route description]
 * @type {String}
 */
module.exports = class View {
  constructor(view, config={}) {
    if(!view) {
      throw new Error(`Continuum:View - needs a view to register`);
    }

    // Instance Members
    this.config = Object.assign({protected: true}, config);
    this.transitionStart = this.transitionStart.bind(this);
    this.transitionStop = this.transitionStop.bind(this);
  }

  /**
   * Mounts the component the DOM;
   * @return {[type]} [description]
   */
  render() {
    console.warn(`Continuum:View - Please configure a render method for the view library you are using. For examples, see the wiki and demo app in the Github repository.`);
  }

  /**
   * Stub for view transition moment.
   * @return {[type]} [description]
   */
  transitionStart() {
    if(!this.spec.transition) return;

    console.warn(`Continuum:View - in an effort to remain agnostic to whatever view library you are using, we do not have an 'out of the box' view transition method. Please override this method in your view instance.`);
  }

  /**
   * Stub for view transition moment.
   * @return {[type]} [description]
   */
  transitionStop() {
    if(!this.spec.transition) return;

    console.warn(`Continuum:View - in an effort to remain agnostic to whatever view library you are using, we do not have an 'out of the box' view transition method. Please override this method in your view instance.`);
  }
}
