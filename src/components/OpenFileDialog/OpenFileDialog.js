// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { type ApolloClient } from 'apollo-client';
import ModalDialog from '../ModalDialog/ModalDialog';
import './OpenFileDialog.css';

type OpenFileDialogProps = {
  client: ApolloClient,
};

type OpenFileDialogState = {
  error: ?Error,
  svg: ?Document,
};

class OpenFileDialog extends React.Component<
  OpenFileDialogProps,
  OpenFileDialogState,
> {
  state = {
    error: null,
    svg: null,
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
          const svg = parser.parseFromString(svgSrc, 'image/svg+xml');
          this.setState({ svg });
        } catch (error) {
          this.setState({ error });
        }
      };
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, svg } = this.state;
    return (
      <ModalDialog title="Open File" onClose={this.handleClose}>
        <form>
          {svg && svg.documentElement ? (
            <div
              className="OpenDialog-preview"
              dangerouslySetInnerHTML={{
                __html: (console.log({ svg }), svg.documentElement.outerHTML),
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
              disabled={!svg || error}
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
