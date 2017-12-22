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
export default class CreateUser extends React.Component {
  constructor(props) {
    super();

    this.state = {user: props.user};
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  update(user, e) {
    e.persist();
    user[e.target.name] = e.target.value;
    this.props.onUpdate(user);
  }

  submit(e) {
    e.preventDefault()
    this.props.onCreate(this.state.user);
  }

  reset() {
    Object.keys(this.refs || {})
      .forEach(ref => this.refs[ref].value = '');
  }

  render() {
    return (
      <Components.Layout.Container className="is-fluid">
        <table className="create-user">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>create</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td colSpan="4">
                  <form onSubmit={this.submit.bind(this)}>
                    <input type="text" ref="first_name" className="input" name="first_name" defaultValue={this.state.user.first_name} onChange={this.update.bind(this, this.state.user)} />
                    <input type="text" className="input" ref="last_name" name="last_name" defaultValue={this.state.user.last_name} onChange={this.update.bind(this, this.state.user)} />
                    <input type="text" className="input" ref="age" defaultValue={this.state.user.age} name="age" onChange={this.update.bind(this, this.state.user)} />
                    <button className="button is-success"
                      disabled={!this.state.user.first_name || !this.state.user.last_name || !this.state.user.age}
                      onClick={this.submit.bind(this)}>Create</button>
                  </form>
                </td>
            </tr>
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
CreateUser.propTypes = {
  user: Types.object.isRequired,
  onUpdate: Types.func.isRequired,
  onCreate: Types.func.isRequired
};
