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
export default class Header extends React.Component {

  render() {
    return (
      <Layout.Container className="header box site-header">
        <Layout.Columns >
          <Layout.Column width={10}>
              <h1><a href="#/">Continuum - {this.props.title || 'Demo'}</a></h1>
          </Layout.Column>
          {this.props.children}
        </Layout.Columns>
      </Layout.Container>
    )
  }
}
