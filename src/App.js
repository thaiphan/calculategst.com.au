import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Calculator from './Calculator';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <Switch>
            <Route
              path="/what-is-gst"
              render={() => {
                return (
                  <div className="wrapper">
                    <div>
                      <h1>What Is GST?</h1>
                      <p>The goods and services tax (GST) in Australia is a value added tax of 10% on most goods and services sales, with some exemptions (such as for certain food, healthcare and housing items) and concessions (including qualifying long term accommodation which is taxed at an effective rate of 5.5%). GST is levied on most transactions in the production process, but is in many cases refunded to all parties in the chain of production other than the final consumer.</p>
                      <p>The tax was introduced by the Howard Government and commenced on 1 July 2000, replacing the previous federal wholesale sales tax system and designed to phase out a number of various State and Territory Government taxes, duties and levies such as banking taxes and stamp duty.</p>
                    </div>
                    <div className="attribution-notice">This article uses material from the Wikipedia article <a href="https://en.wikipedia.org/wiki/Goods_and_services_tax_(Australia)">"Goods and services tax (Australia)"</a>, which is released under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share-Alike License 3.0</a>.</div>
                  </div>
                )
              }}
            />
            <Route path="/" exact={true} component={Calculator}/>
            <Route render={() => {
              return (
                <div className="wrapper">
                  <h1>404 Not Found</h1>
                </div>
              )
            }}/>
          </Switch>

          <footer>
            <div className="wrapper">
              <div>&copy; 2018 <a href="https://thaiphan.github.io/">Thai Phan</a></div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/what-is-gst">What Is GST?</Link></li>
              </ul>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
