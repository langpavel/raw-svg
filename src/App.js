import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './components/Header/Header';
import Drawing from './components/Drawing/Drawing';
import NodeTree from './components/NodeTree/NodeTree';
import OpenFileDialog from './components/OpenFileDialog/OpenFileDialog';

import './App.css';

import sample from './samples/react-riot-can.json';

const QUERY_DIALOGS = gql`
  {
    dialogs @client {
      openFile
    }
    currentDocument @client {
      documentElement
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Query query={QUERY_DIALOGS}>
          {({ data }) => (
            <React.Fragment>
              {data && data.dialogs && data.dialogs.openFile ? (
                <OpenFileDialog />
              ) : null}
              <Drawing {...sample} />
              <NodeTree {...sample} />
            </React.Fragment>
          )}
        </Query>
      </div>
    );
  }
}

export default App;
