import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import SplitForm from './StripeSplitForm';
import './SplitForm.scss';

class StripeForm extends Component {
  state = {
    elementFontSize: window.innerWidth < 450 ? '14px' : '24px',
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      <div className="Checkout checkout-container">
        <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
      </div>
    );
  }
}

export default StripeForm;
