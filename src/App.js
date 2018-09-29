import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './components/Header/Header';
import Drawing from './components/Drawing/Drawing';
import NodeTree from './components/NodeTree/NodeTree';
import OpenFileDialog from './components/OpenFileDialog/OpenFileDialog';

import './App.css';

const QUERY = gql`
  {
    dialogs @client {
      openFile
    }
    currentDocument @client {
      __typename
      id
      fileName
      lastModified
      childNodes {
        __typename
        id
        ... on SvgText {
          text
        }
        ... on SvgCData {
          cdata
        }
        ... on SvgComment {
          comment
        }
        ... on SvgProcessingInstruction {
          name
          content
        }
        ... on SvgElement {
          name
          attributes
          childNodes {
            __typename
            id
            ... on SvgText {
              text
            }
            ... on SvgCData {
              cdata
            }
            ... on SvgComment {
              comment
            }
            ... on SvgProcessingInstruction {
              name
              content
            }
            ... on SvgElement {
              name
              attributes
              childNodes {
                __typename
                id
                ... on SvgText {
                  text
                }
                ... on SvgCData {
                  cdata
                }
                ... on SvgComment {
                  comment
                }
                ... on SvgProcessingInstruction {
                  name
                  content
                }
                ... on SvgElement {
                  name
                  attributes
                  childNodes {
                    __typename
                    id
                    ... on SvgText {
                      text
                    }
                    ... on SvgCData {
                      cdata
                    }
                    ... on SvgComment {
                      comment
                    }
                    ... on SvgProcessingInstruction {
                      name
                      content
                    }
                    ... on SvgElement {
                      name
                      attributes
                      childNodes {
                        __typename
                        id
                        ... on SvgText {
                          text
                        }
                        ... on SvgCData {
                          cdata
                        }
                        ... on SvgComment {
                          comment
                        }
                        ... on SvgProcessingInstruction {
                          name
                          content
                        }
                        ... on SvgElement {
                          name
                          attributes
                          childNodes {
                            __typename
                            id
                            ... on SvgText {
                              text
                            }
                            ... on SvgCData {
                              cdata
                            }
                            ... on SvgComment {
                              comment
                            }
                            ... on SvgProcessingInstruction {
                              name
                              content
                            }
                            ... on SvgElement {
                              name
                              attributes
                              childNodes {
                                __typename
                                id
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Query query={QUERY}>
          {({ data }) => (
            <React.Fragment>
              {data && data.dialogs && data.dialogs.openFile ? (
                <OpenFileDialog />
              ) : null}
              {data && data.currentDocument ? (
                <Drawing {...data.currentDocument} />
              ) : null}
              {data && data.currentDocument ? (
                <NodeTree {...data.currentDocument} />
              ) : null}
            </React.Fragment>
          )}
        </Query>
      </div>
    );
  }
}

export default App;
