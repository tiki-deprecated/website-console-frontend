import { CardElement, injectStripe } from 'react-stripe-elements-universal';
import React, { useState } from 'react';

import styles from './CheckoutForm.module.css';

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

export default injectStripe(CheckoutForm);