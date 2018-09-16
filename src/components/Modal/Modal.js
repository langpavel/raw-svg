// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modals');

export type ModalProps = {
  children: React.Node,
  hidden?: boolean,
};

class Modal extends React.Component<ModalProps> {
  portalElement: HTMLElement;

  constructor(props) {
    super(props);
    this.portalElement = document.createElement('div');
  }

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
