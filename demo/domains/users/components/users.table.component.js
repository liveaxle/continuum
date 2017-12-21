'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - DOMAINS - USERS - COMPONENTS - USERS TABLE
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Dom from 'react-dom';
import Types from 'prop-types';
import Components from '~/components';
import {Utils} from 'continuum';
import {Table, Tr, Th, Td, Thead} from 'reactable';

/**
 * Users table component
 */
export default class UsersTable extends React.Component {
  constructor(props) {
    super();

    this.state = {users: props.users};
  }

  componentWillReceiveProps(props) {
      this.setState(props);
  }

  render() {
    return (
      <Components.Layout.Container className="is-fluid">
        <Table itemsPerPage={20} pageButtonLimit={5}>
          <Thead>
            <Th column="first_name">First Name</Th>
            <Th column="last_name">Last Name</Th>
            <Th column="age">Age</Th>
            <Th column="remove">Remove</Th>
          </Thead>
          {
            this.state.users.map(user => {
              return (
                <Tr key={Utils.hash()}>
                    <Td column="first_name" value={user.first_name}>
                      <div className="control">
                        <input type="text" className="input" defaultValue={user.first_name} onChange={this.props.onChange} />
                      </div>
                    </Td>
                    <Td column="last_name" value={user.last_name}>
                      <div className="control">
                        <input type="text" className="input" defaultValue={user.last_name} onChange={this.props.onChange} />
                      </div>
                    </Td>
                    <Td column="age" value="age">
                      <div className="control">
                        <input type="text" className="input" defaultValue={user.age} onChange={this.props.onChange} />
                      </div>
                    </Td>
                    <Td column="remove">
                      <button className="button is-danger" onClick={this.props.onDelete}>Remove</button>
                    </Td>
                </Tr>
              )
            })
          }
        </Table>
      </Components.Layout.Container>
    )
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
