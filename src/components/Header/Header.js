// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { type ApolloClient } from 'apollo-client';
import './Header.css';

type HeaderProps = {
  client: ApolloClient,
};

class Header extends React.Component<HeaderProps> {
  openDialog = name => {
    return this.props.client.mutate({
      mutation: gql`
        mutation openDialog($name: String) {
          openDialog(name: $name) @client
        }
      `,
      variables: { name },
    });
  };

  openFile = () => this.openDialog('openFile');

  render() {
    return (
      <header className="Header">
        <h1 className="Header-title">
          RawSVG
          <br />
          <span className="smaller">Vector Editor</span>
        </h1>
        <span className="action" onClick={this.openFile}>
          Open file
        </span>
      </header>
    );
  }
}

export default withApollo(Header);
