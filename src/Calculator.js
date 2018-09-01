import {Component} from 'react';
import React from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Price from './Price';
import qs from 'qs';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategy: 'ADD',

      priceAfterGst: '',
      addedGsAmount: '',

      priceBeforeGst: '',
      subtractedGstAmount: '',
    }
  }

  handleAddGst = () => {
    this.setState({
      strategy: 'ADD'
    })
  }

  handleSubtractGst = () => {
    this.setState({
      strategy: 'SUBTRACT'
    })
  }

  calculatePriceAfterGst = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price * 1.1).toFixed(2)
    }
    return ''
  }

  calculateAddedGstAmount = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price * .1).toFixed(2)
    }
    return ''
  }

  calculatePriceBeforeGst = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price / 1.1).toFixed(2)
    }
    return ''
  }

  calculateSubtractedGstAmount = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price / 11).toFixed(2)
    }
    return ''
  }

  getPrice = () => {
    const queryParams = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    if (queryParams.hasOwnProperty('price')) {
      return queryParams.price
    }
    return ''
  }

  render() {
    return (
      <form>
        <h1>Australian GST Calculator</h1>

        <Price/>

        <div>
          <div className={classnames(
            'strategy-selector',
            {'strategy-selector--add': this.state.strategy === 'ADD'},
            {'strategy-selector--subtract': this.state.strategy === 'SUBTRACT'},
          )} role="tablist">
            <button type="button" className="add" onClick={this.handleAddGst}>Add GST</button>
            <button type="button" className="substract" onClick={this.handleSubtractGst}>Subtract GST</button>
          </div>

          {this.state.strategy === 'ADD' && (
            <div className="add-gst" role="tabpanel">
              <div className="form-group">
                <label htmlFor="price-after-gst">Price after GST</label>
                <input id="price-after-gst" type="number" readOnly={true} value={this.calculatePriceAfterGst()}/>
              </div>
              <div className="form-group">
                <label htmlFor="added-gst-amount">GST Amount</label>
                <input id="added-gst-amount" type="number" readOnly={true} value={this.calculateAddedGstAmount()}/>
              </div>
            </div>
          )}

          {this.state.strategy === 'SUBTRACT' && (
            <div className="subtract-gst" role="tabpanel">
              <div className="form-group">
                <label htmlFor="price-before-gst">Price before GST</label>
                <input id="price-before-gst" type="number" readOnly={true} value={this.calculatePriceBeforeGst()}/>
              </div>
              <div className="form-group">
                <label htmlFor="subtracted-gst-amount">GST Amount</label>
                <input id="subtracted-gst-amount" type="number" readOnly={true} value={this.calculateSubtractedGstAmount()}/>
              </div>
            </div>
          )}
        </div>
      </form>
    )
  }
}

export default withRouter(Calculator)