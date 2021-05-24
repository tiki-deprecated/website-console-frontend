import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '../context/store';
// import { loadProducts } from './api/load-products.js';
import styles from '../styles/Home.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { profile, acct } = useAppContext()
    return (
        <>
            {/* persistence test */}
            {console.log(acct)}
            <h3><i>{ profile ? profile.name : 'loading...' } is sitll logged in...</i></h3>

            <Elements stripe={stripePromise}>
                <CheckoutForm totalCost={1} />
            </Elements>
        </>
    )
}
