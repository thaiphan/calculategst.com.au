import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Price from './Price';
import qs from 'qs';
import './Calculator.css'
import Results from './Results';

class Calculator extends PureComponent {
  getQueryParams = () => qs.parse(this.props.location.search, {
    ignoreQueryPrefix: true
  })

  getStrategy = () => {
    const queryParams = this.getQueryParams()

    if (queryParams.hasOwnProperty('strategy')) {
      return queryParams.strategy
    }
    return 'ADD'
  }

  getAddStrategyQueryParam = () => {
    const {strategy, ...queryParams} = this.getQueryParams()

    return qs.stringify({
      ...queryParams,
      strategy: 'ADD',
    })
  }

  getSubstractStrategyQueryParam = () => {
    const {strategy, ...queryParams} = this.getQueryParams()

    return qs.stringify({
      ...queryParams,
      strategy: 'SUBTRACT',
    })
  }

  handleChangeGSTRate = event => {
    event.preventDefault()

    let inputtedValue = +event.target.value
    if (inputtedValue > 100) {
      inputtedValue = 100
    } else if (inputtedValue < 0) {
      inputtedValue = 0
    }

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: qs.stringify({
        ...this.getQueryParams(),
        gstRate: inputtedValue,
      })
    })
  }

  getGSTRate = () => {
    const {gstRate = '10'} = this.getQueryParams()

    return gstRate
  }

  render() {
    return (
      <form className="content">
        <h1>Australian GST Calculator</h1>

        <div>
          <Price/>

          <div className="form-group">
            <label>Enter GST Rate (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              onChange={this.handleChangeGSTRate}
              value={this.getGSTRate()}
            />
          </div>

          <div className={classnames(
            'form-group',
            'strategy-selector',
            {'strategy-selector--add': this.getStrategy() === 'ADD'},
            {'strategy-selector--subtract': this.getStrategy() === 'SUBTRACT'},
          )} role="tablist">
            <Link className="button add" to={{
              pathname: '/',
              search: this.getAddStrategyQueryParam()
            }}>Add GST</Link>
            <Link className="button substract" to={{
              pathname: '/',
              search: this.getSubstractStrategyQueryParam()
            }}>Subtract GST</Link>
          </div>
        </div>

        <Results/>
      </form>
    )
  }
}

export default withRouter(Calculator)