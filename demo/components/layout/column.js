'use strict';

/***********************************************************************************************************************************************
 * COMPONENTS - LAYOUT - COLUMN
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import classnames from 'classnames';

/**
 * Sizes Map
 * @type {Object}
 */
const sizes = {
  '1/3': 'is-one-third',
  '2/3': 'is-two-thirds',
  '1/2': 'is-half',
  '1/4': 'is-one-quarter',
  '3/4': 'is-three-quarters',
  '1/5': 'is-one-fifth',
  '2/5': 'is-two-fifths',
  '3/5': 'is-three-fifths',
  '4/5': 'is-four-fifths',
  '1':'is-1',
  '2':'is-2',
  '3':'is-3',
  '4':'is-4',
  '5':'is-5',
  '6':'is-6',
  '7':'is-7',
  '8':'is-8',
  '9':'is-9',
  '10':'is-10',
  '11':'is-11',
  '12':'is-12'
};

/**
 * Column
 */
export default class Column extends React.Component {
  render() {
    return <div className={
        `column ${sizes[this.props.width] || ''}
        is-offset-${this.props.offset||0}
        ${this.props.centered? 'has-text-centered' : ''}
        ${this.props.right? 'has-text-right': ''}`
      }>
      {this.props.children}
    </div>
  }
}
