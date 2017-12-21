'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - LOADER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';


/**
 * [show description]
 * @type {[type]}
 */
export default class Loader extends React.Component {
  render() {
    let style = {display: (this.props.show? 'block' : 'none')}

    return (
      <div>
        future loading gif
      </div>
    );
  }
}
