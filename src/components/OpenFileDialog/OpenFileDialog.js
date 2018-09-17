// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { type ApolloClient } from 'apollo-client';
import ModalDialog from '../ModalDialog/ModalDialog';
import { convertSvgDom } from '../../lib/svg/convertSvgDom';
import './OpenFileDialog.css';

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
      const document = convertSvgDom({ fileName, lastModified, svgDocument });
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
