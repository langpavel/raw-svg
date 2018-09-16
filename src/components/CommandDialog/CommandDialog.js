// @flow

import * as React from 'react';
import './CommandDialog.css';

type CommandDialogProps = {};

type CommandDialogState = {
  opened: boolean,
};

class CommandDialog extends React.Component<
  CommandDialogProps,
  CommandDialogState,
> {
  state = {
    opened: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleGlobalKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleGlobalKeyDown);
  }

  handleGlobalKeyDown = e => {
    console.log('keydown', e);
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      this.open();
    }
  };

  open = () => this.setState({ opened: true });
  close = () => this.setState({ opened: false });

  render() {
    if (!this.state.opened) return null;
    return (
      <div className="CommandDialog-overlay" onClick={this.close}>
        <nav className="CommandDialog">
          <header className="CommandDialog-header">
            <input placeholder="Search Command" />
          </header>
          <hr />
          <div className="Commands">
            <div>Open file</div>
          </div>
        </nav>
      </div>
    );
  }
}

export default CommandDialog;
