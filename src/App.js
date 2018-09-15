import React, { Component } from 'react';
import Header from './components/Header/Header';
import Drawing from './components/Drawing/Drawing';
import './App.css';

import sample from './samples/react-riot-can.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Drawing root={sample.elements[0]} />
      </div>
    );
  }
}

export default App;
