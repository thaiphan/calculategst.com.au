import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Calculator from './Calculator';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Calculator/>

          <footer>
            <div className="wrapper">
              &copy; 2018 <a href="https://thaiphan.github.io/">Thai Phan</a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
