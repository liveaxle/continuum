'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - HOME
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Domains from '~/domains';
import Components from '~/components';

/**
 *
 */
export default class Home extends React.Component {
  constructor(props) {
    super();

    // View Component state
    this.state = {users: []};

    // Data subscriptions
    this.subscriptions = {
      users: Domains.Users.subscribe(users => this.setState({users: users}))
    };
  }

  componentWillMount() {
    Domains.Users.get();
  }

  componentWillUnmount() {
    Object.keys(this.subscriptions).forEach(sub => this.subscriptions[sub].cancel());
  }

  updateUser(user) {
    console.log(user);
  }

  deleteUser(user) {
    console.log(user);
  }

  render() {
    return (
      <Components.Layout.Section className="view">
        <Components.Site.Header />
        <Components.Site.Body className="has-margin-vertical__large">
          <Domains.Users.Components.Table users={this.state.users} onChange={this.updateUser.bind(this)} onDelete={this.deleteUser.bind(this)} />
        </Components.Site.Body>
      </Components.Layout.Section>
    );
  }
}
