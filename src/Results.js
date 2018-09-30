import React, {PureComponent} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import VisuallyHidden from '@reach/visually-hidden';
import qs from 'qs';
import {withRouter} from 'react-router-dom';

class Results extends PureComponent {
  getQueryParams = () => qs.parse(this.props.location.search, {
    ignoreQueryPrefix: true
  })

  calculatePriceAfterGst = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price * (1 + this.getGSTRate())).toFixed(2)
    }
    return ''
  }

  calculateAddedGstAmount = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price * this.getGSTRate()).toFixed(2)
    }
    return ''
  }

  calculatePriceBeforeGst = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return (price / (1 + this.getGSTRate())).toFixed(2)
    }
    return ''
  }

  calculateSubtractedGstAmount = () => {
    if (this.getPrice() !== '') {
      const price = parseFloat(this.getPrice())

      return ((price / ((1 + this.getGSTRate()) * 100)) * (this.getGSTRate() * 100)).toFixed(2)
    }
    return ''
  }

  getPrice = () => {
    const queryParams = this.getQueryParams()

    if (queryParams.hasOwnProperty('price')) {
      return queryParams.price
    }
    return ''
  }

  getGSTRate = () => {
    const {gstRate = '10'} = this.getQueryParams()

    return parseInt(gstRate) / 100
  }

  getStrategy = () => {
    const queryParams = this.getQueryParams()

    if (queryParams.hasOwnProperty('strategy')) {
      return queryParams.strategy
    }
    return 'ADD'
  }

  render() {
    if (this.getStrategy() === 'ADD') {
      return (
        <div className="add-gst" role="tabpanel">
          <div className="form-group">
            <label htmlFor="price-after-gst">Price after GST</label>
            <div className="input-container">
              <input id="price-after-gst" type="number" readOnly={true} value={this.calculatePriceAfterGst()}/>
              <CopyToClipboard text={this.calculatePriceAfterGst()}>
                <button type="button" className="copy-to-clipboard">
                  <VisuallyHidden>Add price after GST of {this.calculatePriceAfterGst()} to clipboard</VisuallyHidden>
                  <svg
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="copy"
                    className="svg-inline--fa fa-copy fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={21}
                  >
                    <path
                      fill="currentColor"
                      d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                    />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="added-gst-amount">GST Amount</label>
            <div className="input-container">
              <input id="added-gst-amount" type="number" readOnly={true} value={this.calculateAddedGstAmount()}/>
              <CopyToClipboard text={this.calculateAddedGstAmount()}>
                <button type="button" className="copy-to-clipboard">
                  <VisuallyHidden>Add GST amount of {this.calculatePriceAfterGst()} to clipboard</VisuallyHidden>
                  <svg
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="copy"
                    className="svg-inline--fa fa-copy fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={21}
                  >
                    <path
                      fill="currentColor"
                      d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                    />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )
    }

    if (this.getStrategy() === 'SUBTRACT') {
      return (
        <div className="subtract-gst" role="tabpanel">
          <div className="form-group">
            <label htmlFor="price-before-gst">Price before GST</label>
            <div className="input-container">
              <input id="price-before-gst" type="number" readOnly={true} value={this.calculatePriceBeforeGst()}/>
              <CopyToClipboard text={this.calculatePriceBeforeGst()}>
                <button type="button" className="copy-to-clipboard">
                  <VisuallyHidden>Add price before GST of {this.calculatePriceAfterGst()} to clipboard></VisuallyHidden>
                  <svg
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="copy"
                    className="svg-inline--fa fa-copy fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={21}
                  >
                    <path
                      fill="currentColor"
                      d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                    />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subtracted-gst-amount">GST Amount</label>
            <div className="input-container">
              <input
                id="subtracted-gst-amount"
                type="number"
                readOnly={true}
                value={this.calculateSubtractedGstAmount()}
              />
              <CopyToClipboard text={this.calculateSubtractedGstAmount()}>
                <button type="button" className="copy-to-clipboard">
                  <VisuallyHidden>Add GST amount of {this.calculateSubtractedGstAmount()} to clipboard</VisuallyHidden>
                  <svg
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="copy"
                    className="svg-inline--fa fa-copy fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={21}
                  >
                    <path
                      fill="currentColor"
                      d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                    />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )
    }

    return null
  }
}

export default withRouter(Results)