import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useMemo, useState } from "react";

import styles from './CheckoutForm.module.css';

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#00133f',
          padding: '10px 14px',
          fontSize: '16px',
          fontFamily: '"Source Code Pro", monospace',
          boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
          border: '0',
          outline: '0',
          borderRadius: '4px',
          background: 'white',

          ':-webkit-autofill': {
            color: '#00133f',
          },
          '::placeholder': {
            color: '#aab7c4',
          }
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      }
    }),
  );

  return options;
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [status, setStatus] = useState('default');

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setStatus('submitting');

    //This method should be updated to create a customer as well as a charge.
    try {
      let { token } = await stripe.createToken({ name: 'Name' });

      let response = await fetch('/.netlify/functions/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: totalCost * 100,
          token: token.id,
        }),
      });

      if (response.ok) {
        setStatus('complete');
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      setStatus('error');
    }
  };


  if (status === 'complete') {
    return <div className={styles.CheckoutFormComplete}>Payment successful!</div>;
  }

  return (
    <div className={styles.checkoutWrapper}>
      <form onSubmit={handleSubmit} className={styles.stripeCheckout}>
        <label>
          Payment details
        </label>
        <div className={styles.row}>
          <div className={styles.field, styles.fullWidth}>
            <label for="emailInput" className="form-label">Email</label>
            <input type="email" className="form-control" id="emailInput" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field, styles.fullWidth}>
            <label for="addressInput" className="form-label">Billing Address</label>
            <input type="text" className="form-control" id="addressInput" />
          </div>
        </div>
        <div className={styles.flexRow}>
          <div className={styles.field, styles.halfWidth}>
            <label for="cityInput" className="form-label">City</label>
            <input type="text" className="form-control" id="cityInput" />
          </div>
          <div className={styles.field, styles.quarterWidth}>
            <label for="stateInput" className="form-label">State</label>
            <input type="text" className="form-control" id="stateInput" />
          </div>
          <div className={styles.field, styles.quarterWidth}>
            <label for="zipInput" className="form-label">ZIP</label>
            <input type="text" className="form-control" id="zipInput" />
          </div>
        </div>
        <div className={styles.formInput}>
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
        </div>
        <button type="submit" disabled={!stripe} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting' : 'Pay $1'}
        </button>
        {status === 'error' && (
          <div className={styles.CheckoutFormError}>Something went wrong.</div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;

/*
Old Method of Checkout-------------

function CheckoutForm({ stripe, totalCost }) {
  const [status, setStatus] = useState('default');

  const submit = async e => {
    e.preventDefault();

    setStatus('submitting');

    try {
      let { token } = await stripe.createToken({ name: 'Name' });

      let response = await fetch('/.netlify/functions/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: totalCost * 100,
          token: token.id,
        }),
      });

      if (response.ok) {
        setStatus('complete');
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'complete') {
    return <div className={styles.CheckoutFormComplete}>Payment successful!</div>;
  }

  return (
    <div className={styles.StripeElement}>
      <h4>Payment Page</h4>
      <form className={styles.CheckoutForm} onSubmit={submit}>
        <CardElement />
        <button
          className={styles.CheckoutFormButton}
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting' : 'Pay $1'}
        </button>
        {status === 'error' && (
          <div className={styles.CheckoutFormError}>Something went wrong.</div>
        )}
      </form>
    </div>

  );
}

export default injectStripe(CheckoutForm); */