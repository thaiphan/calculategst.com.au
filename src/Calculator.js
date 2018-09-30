import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Price from './Price';
import qs from 'qs';
import './Calculator.css'
import Results from './Results';

class Calculator extends PureComponent {

  getStrategy = () => {
    const queryParams = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    if (queryParams.hasOwnProperty('strategy')) {
      return queryParams.strategy
    }
    return 'ADD'
  }

  getAddStrategyQueryParam = () => {
    const {strategy, ...queryParams} = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    return qs.stringify({
      ...queryParams,
      strategy: 'ADD',
    })
  }

  getSubstractStrategyQueryParam = () => {
    const {strategy, ...queryParams} = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    return qs.stringify({
      ...queryParams,
      strategy: 'SUBTRACT',
    })
  }

  render() {
    return (
      <form className="content">
        <h1>Australian GST Calculator</h1>

        <Price/>

        <div>
          <div className={classnames(
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

          <Results/>
        </div>
      </form>
    )
  }
}

export default withRouter(Calculator)