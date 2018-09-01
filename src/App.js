import React, { Component } from 'react';
import './App.css';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: '',
      strategy: 'ADD',

      priceAfterGst: '',
      addedGsAmount: '',

      priceBeforeGst: '',
      subtractedGstAmount: '',
    }
  }

  handleChangePrice = event => {
    this.setState({
      price: event.target.value
    })
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
    if (this.state.price !== '') {
      const price = parseFloat(this.state.price)

      return (price * 1.1).toFixed(2)
    }
    return ''
  }

  calculateAddedGstAmount = () => {
    if (this.state.price !== '') {
      const price = parseFloat(this.state.price)

      return (price * .1).toFixed(2)
    }
    return ''
  }

  calculatePriceBeforeGst = () => {
    if (this.state.price !== '') {
      const price = parseFloat(this.state.price)

      return (price / 1.1).toFixed(2)
    }
    return ''
  }

  calculateSubtractedGstAmount = () => {
    if (this.state.price !== '') {
      const price = parseFloat(this.state.price)

      return (price / 11).toFixed(2)
    }
    return ''
  }

  render() {
    return (
      <form>
        <h1>Australian GST Calculator</h1>

        <div className="form-group">
          <label htmlFor="price">Enter Price To Calculate</label>
          <input id="price" type="number" min="0" value={this.state.value} onChange={this.handleChangePrice}/>
        </div>

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
    );
  }
}

export default App;
