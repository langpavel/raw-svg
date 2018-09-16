// @flow

import * as React from 'react';
import Modal from '../Modal/Modal';
import './ModalDialog.css';

type ModalProps = {
  children: React.Node,
  title: string,
  onClose?: () => any,
};

class ModalDialog extends React.Component<ModalProps> {
  handleClose = (e: KeyboardEvent | SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const { onClose } = this.props;
    if (onClose) onClose();
  };

  // this is not React handler
  escFunction = (e: KeyboardEvent) => {
    if (e.keyCode === 27) this.handleClose(e);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const { onClose, title, children } = this.props;
    return (
      <Modal>
        <div className="ModalDialog">
          <div
            className="ModalDialog-overlay"
            onKeyDown={this.handleClose}
            onClick={this.handleClose}
          />
          <div className="ModalDialog-dialog">
            <div className="ModalDialog-header">
              <h2 className="ModalDialog-title">{title}</h2>
              {onClose && (
                <button
                  type="button"
                  className="ModalDialog-modalClose"
                  onClick={this.handleClose}
                >
                  X
                </button>
              )}
            </div>
            <div className="ModalDialog-body">{children}</div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalDialog;
