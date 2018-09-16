// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot: HTMLElement = document.getElementById('modals');

export type ModalProps = {
  children: React.Node,
  hidden?: boolean,
};

class Modal extends React.Component<ModalProps> {
  portalElement: HTMLElement = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.portalElement);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.portalElement);
  }

  render() {
    const { hidden, children } = this.props;
    return hidden ? null : ReactDOM.createPortal(children, this.portalElement);
  }
}

export default Modal;
