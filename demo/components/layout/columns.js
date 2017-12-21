'use strict';

/***********************************************************************************************************************************************
 * LAYOUT - CONTAINER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Column from './column';

/**
 * Container Wrapper
 */
export default class Columns extends React.Component {
  render() {
    let style = this.props.style || {};
    return (
      <div className={`columns  ${this.props.className || ''}`} style={style}>
        {this.props.children}
      </div>
    )
  }
};
