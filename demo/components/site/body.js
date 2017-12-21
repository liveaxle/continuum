'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - SITE - HEADER
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import {Layout} from '~/components';

/**
 *
 */
export default class Body extends React.Component {

  render() {
    return (
      <Layout.Container className={`site-body box ${this.props.className}`}>
        {this.props.children}
      </Layout.Container>
    )
  }
}
