import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '../context/store';
// import { loadProducts } from './api/load-products.js';
import authenticated from '../components/utils/authenticated';
import Loading from '../components/Loading';
import styles from '../styles/Home.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { profile, acct, setLogOut, updateAcct } = useAppContext();
    const { logout } = useAuth0();
    
    useEffect((profile) => {
        if (!authenticated(profile)) {
            setLogOut(true);
            logout({ returnTo: window.location.origin });
        }
    },[profile])

    if (profile) {
        {console.log(acct)}
        if (acct.status === 'pre-application') {
            return (
                <>
                    <h1>First Things First!</h1>
                    <h4>You must apply and be approved before providing your payment info.</h4>
                </>
            )
        } 
        if (acct.status === 'applied') {
            return (
                <>
                    <h1>Thanks For Submitting Your Application!</h1>
                    <h4>If approved, you will then provide your payment information.</h4>
                </>
            )
        } 
        if (acct.status === 'paid') {
            return (
                <>
                    <h1>Thanks For Setting Up Your Account!</h1>
                    <h4>We already have your payment information.</h4>
                </>
            )
        } 
        if (acct.status === 'approved') {
            return (
                <>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm totalCost={1} profile={profile} updateAcct={updateAcct}/>
                    </Elements>
                </>
            );
        } 
    } else return <Loading/>
}
