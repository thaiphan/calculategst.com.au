import {Component} from 'react';
import React from 'react';
import {withRouter} from 'react-router-dom';
import qs from 'qs';

class Price extends Component {
  handleChangePrice = event => {
    event.preventDefault()

    const {price, ...queryParams} = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    let updatedPrice = {}
    if (event.target.value !== '') {
      updatedPrice = {
        price: +event.target.value
      }
    }

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: qs.stringify({
        ...updatedPrice,
        ...queryParams,
      })
    })
  }

  getPrice = () => {
    const {price = ''} = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    return price
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="price">Enter Price To Calculate</label>
        <input id="price" type="number" min="0" value={this.getPrice()} onChange={this.handleChangePrice}/>
      </div>
    )
  }
}

export default withRouter(Price)