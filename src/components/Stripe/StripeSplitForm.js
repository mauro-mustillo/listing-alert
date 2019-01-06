import React, { Component } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from 'react-stripe-elements';
import './SplitForm.scss';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#d8d8d8',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


class _SplitForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="d-flex flex-column split-form-style justify-content-between">
        <label>
          Card number
          <CardNumberElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

export default SplitForm;
