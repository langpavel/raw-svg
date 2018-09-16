// @flow

import * as React from 'react';
import './OpenFileDialog.css';
import ModalDialog from '../ModalDialog/ModalDialog';

type OpenFileDialogProps = {};

type OpenFileDialogState = {
  error: ?Error,
  svg: any,
};

class OpenFileDialog extends React.Component<
  OpenFileDialogProps,
  OpenFileDialogState,
> {
  state = {
    error: null,
    svg: null,
  };

  handleClose = () => {};

  handleChange = e => {
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
          {svg ? (
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

export default OpenFileDialog;
