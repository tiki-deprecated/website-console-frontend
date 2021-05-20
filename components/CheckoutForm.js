import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useMemo, useState } from "react";

import styles from './CheckoutForm.module.css';
import { useAuth0 } from '@auth0/auth0-react';

const useOptions = () => {
  const options = useMemo(
    () => ({
      hidePostalCode: true,
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

const CheckoutForm = (props) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
  } = useAuth0();

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [status, setStatus] = useState('default');

  //Form Values
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const { totalCost } = props;

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
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        
        //UPDATE TO NEW API ENDPOINT

        let response = await fetch('/.netlify/functions/charge', {
          method: 'POST',
          body: JSON.stringify({
            amount: totalCost * 100,
            paymentMethod: paymentMethod,
            name: user.name,
            email: user.email,
            billingInfo: {
              address: address,
              city: city,
              state: state,
              zip: zip,
            }
          }),
        });

        if (response.ok) {
          setStatus('complete');
        } else {
          throw new Error('Network response was not ok.');
        }

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
            <label htmlFor="addressInput" className="form-label">Billing Address</label>
            <input required type="text" className="form-control" id="addressInput" value={address} onChange={e => setAddress(e.target.value)}/>
          </div>
        </div>
        <div className={styles.flexRow}>
          <div className={styles.field, styles.halfWidth}>
            <label htmlFor="cityInput" className="form-label">City</label>
            <input required type="text" className="form-control" id="cityInput" value={city} onChange={e => setCity(e.target.value)}/>
          </div>
          <div className={styles.field, styles.quarterWidth}>
            <label htmlFor="stateInput" className="form-label">State</label>
            <input required type="text" className="form-control" id="stateInput" value={state} onChange={e => setState(e.target.value)}/>
          </div>
          <div className={styles.field, styles.quarterWidth}>
            <label htmlFor="zipInput" className="form-label">ZIP</label>
            <input required type="text" className="form-control" id="zipInput" value={zip} onChange={e => setZip(e.target.value)}/>
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