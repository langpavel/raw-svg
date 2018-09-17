// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { type ApolloClient } from 'apollo-client';
import ModalDialog from '../ModalDialog/ModalDialog';
import './OpenFileDialog.css';
import { DocumentNode } from 'apollo-link';

type OpenFileDialogProps = {
  client: ApolloClient,
};

type OpenFileDialogState = {
  error: ?Error,
  svgDocument: ?Document,
  fileName: string,
  lastModified: number,
};

class OpenFileDialog extends React.Component<
  OpenFileDialogProps,
  OpenFileDialogState,
> {
  state = {
    error: null,
    svgDocument: null,
    fileName: null,
    lastModified: null,
  };

  closeDialog = name => {
    return this.props.client.mutate({
      mutation: gql`
        mutation closeDialog($name: String) {
          closeDialog(name: $name) @client
        }
      `,
      variables: { name },
    });
  };

  handleClose = () => this.closeDialog('openFile');

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        try {
          const svgSrc = e.target.result;
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgSrc, 'image/svg+xml');
          this.setState({
            svgDocument,
            fileName: file.name,
            lastModified: file.lastModified,
          });
        } catch (error) {
          this.setState({ error });
        }
      };
    } catch (error) {
      this.setState({ error });
    }
  };

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fileName, lastModified, svgDocument } = this.state;
    if (svgDocument) {
      const getAttributes = (node: DocumentNode) => {
        const result = {};
        for (let entry of node.attributes) {
          result[entry.name] = entry.value;
        }
        return result;
      };

      const processNode = (node: DocumentNode) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
        switch (node.nodeType) {
          case 1: {
            // ELEMENT_NODE
            return {
              __typename: 'SvgElement',
              name: node.nodeName,
              attributes: getAttributes(node),
              childNodes: getChildNodes(node),
            };
          }
          case 3: {
            // TEXT_NODE
            return {
              __typename: 'SvgText',
              text: node.nodeValue,
            };
          }
          case 4: {
            // CDATA_SECTION_NODE
            return {
              __typename: 'SvgCdata',
              cdata: node.nodeValue,
            };
          }
          case 7: {
            // PROCESSING_INSTRUCTION_NODE
            return {
              __typename: 'SvgProcessingInstruction',
              instruction: node.nodeValue,
            };
          }
          case 8: {
            // COMMENT_NODE
            return {
              __typename: 'SvgComment',
              comment: node.nodeValue,
            };
          }
          case 9: {
            // DOCUMENT_NODE
            return {
              __typename: 'SvgDocument',
              fileName,
              lastModified,
              childNodes: getChildNodes(node),
            };
          }
          // case 10: // DOCUMENT_TYPE_NODE
          // case 11: // DOCUMENT_FRAGMENT_NODE
          default: {
            console.error('Unhandled node type:', node.nodeType, node);
            return null;
          }
        }
      };

      const getChildNodes = (parent: DocumentNode) => {
        const result = [];
        if (parent.childNodes.length === 0) return null;
        for (let node of parent.childNodes) {
          const element = processNode(node);
          if (element) result.push(element);
        }
        if (result.length === 0) return null;
        return result;
      };

      const document = processNode(svgDocument);
      console.log('SVG:', document);

      this.handleClose();
    }
  };

  render() {
    const { error, svgDocument } = this.state;
    return (
      <ModalDialog title="Open File" onClose={this.handleClose}>
        <form onSubmit={this.handleSubmit}>
          {svgDocument && svgDocument.documentElement ? (
            <div
              className="OpenDialog-preview"
              dangerouslySetInnerHTML={{
                __html: svgDocument.documentElement.outerHTML,
              }}
            />
          ) : (
            'Please, select SVG file'
          )}
          {error ? <pre>{error.message}</pre> : ''}
          <div className="OpenDialog-buttons">
            <input
              type="file"
              accept="image/svg+xml, image/svg, .svg"
              onChange={this.handleChange}
            />
            <button
              disabled={!svgDocument || error}
              className="OpenDialog-open"
              type="submit"
            >
              Open
            </button>
          </div>
        </form>
      </ModalDialog>
    );
  }
}

export default withApollo(OpenFileDialog);
