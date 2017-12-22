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

  update(user, e) {
    e.persist();
    user[e.target.name] = e.target.value;
    this.props.onChange(user, e);
  }

  render() {
    const users = this.state.users;

    return (
      <Components.Layout.Container className="is-fluid">
        <table className="users-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              (this.state.users).map(user => {
                return (
                  <tr key={user['continuum.key']}>
                      <td>
                        <div className="control">
                          <input type="text" className="input" name="first_name" defaultValue={user.first_name} onChange={this.update.bind(this, user)} />
                        </div>
                      </td>
                      <td>
                        <div className="control">
                          <input type="text" className="input" name="last_name" defaultValue={user.last_name} onChange={this.update.bind(this, user)} />
                        </div>
                      </td>
                      <td>
                        <div className="control">
                          <input type="text" className="input" defaultValue={user.age} name="age" onChange={this.update.bind(this, user)} />
                        </div>
                      </td>
                      <td>
                        <button className="button is-danger" onClick={this.props.onDelete.bind(this, user)}>Remove</button>
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
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
