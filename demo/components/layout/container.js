'use strict';

/***********************************************************************************************************************************************
 * LAYOUT - CONTAINER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

/**
 * Container Wrapper
 */
export default class Container extends React.Component {
  render() {
    return (
      <div className={`container ${this.props.className || ''}`}>
        {this.props.children}
      </div>
    )
  }
};
