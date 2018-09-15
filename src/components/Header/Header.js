// @flow

import * as React from 'react';
import './Header.css';

type HeaderProps = {};

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header className="Header">
        <h1 className="Header-title">RawSVG — Vector Editor</h1>
      </header>
    );
  }
}

export default Header;
