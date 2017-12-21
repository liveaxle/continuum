'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - COMPONENTS - USERS TABLE
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Types from 'prop-types';
import {Table, Tr, Th, Td} from 'reactable';

/**
 * Users table component
 */
export default class UsersTable extends React.Component {
  constructor(props) {
    super();

    this.state = {users: props.users};
  }

  render() {
    return <div>user table</div>
  }
}

/**
 * User Table prop schema
 * @type {Object}
 */
UsersTable.propTypes = {
  users: Types.array.isRequired,
  onChange: Types.func.isRequired,
  onDelete: Types.func.isRequired
};
