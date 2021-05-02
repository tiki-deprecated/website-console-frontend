import React from 'react';
import Head from "next/head";
import { Elements, StripeProvider } from 'react-stripe-elements-universal';
import CheckoutForm from '../components/CheckoutForm';
// import { loadProducts } from './api/load-products.js';
import styles from '../styles/Home.module.css'

export default function Payment(){
    return (
        <>
            <>
                <Head>
                    <script  src="https://js.stripe.com/v3/" />
                </Head>
            </>
            <StripeProvider apiKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
                <Elements>
                    <CheckoutForm totalCost={1} />
                </Elements>
            </StripeProvider>
        </>
    )
}
