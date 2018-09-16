// @flow

import * as React from 'react';
import './OpenFileDialog.css';
import ModalDialog from '../ModalDialog/ModalDialog';

type OpenFileDialogProps = {};

class OpenFileDialog extends React.Component<OpenFileDialogProps> {
  handleClose = () => {};
  render() {
    const {} = this.props;
    return (
      <ModalDialog title="Open File" onClose={this.handleClose}>
        <input type="file" />
      </ModalDialog>
    );
  }
}

export default OpenFileDialog;
