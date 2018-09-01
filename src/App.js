import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Calculator from './Calculator';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Calculator/>
      </BrowserRouter>
    );
  }
}

export default App;
