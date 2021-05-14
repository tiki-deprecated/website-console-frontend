import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useMemo, useState } from "react";

import styles from './CheckoutForm.module.css';

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "18px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
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
        Card details
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
      </label>
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