import React, { Component } from 'react';
import Header from './components/Header/Header';
import Drawing from './components/Drawing/Drawing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Drawing />
      </div>
    );
  }
}

export default App;
