import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
// import { loadProducts } from './api/load-products.js';
import styles from '../styles/Home.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm totalCost={1} />
            </Elements>
        </>
    )
}
