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
    const { profile, acct, setLogOut } = useAppContext();
    const { logout } = useAuth0();
    
    useEffect((profile) => {
        if (!authenticated(profile)) {
            setLogOut(true);
            logout({ returnTo: window.location.origin });
        }
    },[profile])

    if (profile) {
        return (
            <>
                {/* persistence test */}
                {console.log(acct)}
                <h3><i>{ profile ? profile.name : 'loading...' } is sitll logged in...</i></h3>
    
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalCost={1} profile={profile}/>
                </Elements>
            </>
        )
    } else return <Loading/>
}
