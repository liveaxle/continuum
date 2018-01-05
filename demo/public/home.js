'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - HOME
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Domains from '~/domains';
import Components from '~/components';
import {Utils} from 'continuum';

/**
 *
 */
export default class Home extends React.Component {
  constructor(props) {
    super();

    // View Component state
    this.state = {users: [], user: {}};

    // Data subscriptions
    this.subscriptions = {
      users: Domains.Users.subscribe(users => {
        this.setState({users: users})
      }),
      user: Domains.Users.Store.User.subscribe(user => {
        this.setState({user: user});
      })
    };
  }

  componentWillMount() {
    Domains.Users.get({params: {_sort: 'created', _order:'desc'}});
    Domains.Users.Store.User.set(Domains.Users.Model()).dispatch();
  }

  componentWillUnmount() {
    Object.keys(this.subscriptions).forEach(sub => this.subscriptions[sub].cancel());
  }

  updateUser(user) {
    Domains.Users.update(user);
  }

  deleteUser(user) {
    Domains.Users.delete(user);
  }

  updateUserModel(user) {
    Domains.Users.Store.User.set(user).dispatch();
  }

  createUser(user) {
    Domains.Users.create(user, {prepend: true})
      .then(() => this.refs.create.reset())
      .then(() => this.updateUserModel({}))
  }

  render() {
    return (
      <Components.Layout.Section className="view">
        <Components.Site.Header />
        <Components.Site.Body className="has-margin-vertical__large">
          <Domains.Users.Components.Create user={this.state.user} onCreate={this.createUser.bind(this)} onUpdate={this.updateUserModel.bind(this)} ref="create" />
          <hr />
          <Domains.Users.Components.Table users={this.state.users} onChange={Utils.debounce(this.updateUser.bind(this), 300)} onDelete={this.deleteUser.bind(this)} />
        </Components.Site.Body>
      </Components.Layout.Section>
    );
  }
}
