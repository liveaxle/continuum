'use strict';

/***********************************************************************************************************************************************
 * LAYOUT - SECTION
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';

/**
 * Container Wrapper
 */
export default class Section extends React.Component {
  render() {
    return (
      <div className={`section ${this.props.className}`}>
        {this.props.children}
      </div>
    )
  }
};
