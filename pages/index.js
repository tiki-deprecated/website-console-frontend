import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useAppContext } from '../context/store';
import styles from '../styles/Home.module.css'

export default function Home() {
    const {
        loggedIn, 
        setLoggedIn, 
        profile, 
        setProfile, 
        acct, 
        getAcct, 
        createAcct, 
        logOut, 
        setLogOut 
    } = useAppContext();

    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const router = useRouter()

    // persist profile on page refresh
    useEffect(() => {
        // only run in browser
        if (typeof window !== 'undefined' && !logOut) {
            const localProfile = window.localStorage.getItem('profile');
            const localAcct = window.localStorage.getItem('profile');
            // backup valid context in localStorage
            if (profile) {
                window.localStorage.setItem('profile', JSON.stringify(profile));
                console.log('localProfile: ', localProfile);
                console.log('profile context is live, backing up in localSorage...');
            }
            if (acct) {
                window.localStorage.setItem('acct', JSON.stringify(acct));
                console.log('localAcct: ', localAcct);
                console.log('acct context is live, backing up in localSorage...');
            }
            // refresh context with localStorage
            if (!profile && localProfile) {
                setProfile(JSON.parse(localProfile));
                console.log('profile: ', profile);
                console.log('profile context is stale, refreshing from localStorage...');
            }   
            if (!acct && localAcct) {
                setProfile(JSON.parse(localAcct));
                console.log('acct: ', acct);
                console.log('acct context is stale, refreshing from localStorage...');
            }  
        }
        if (logOut) {
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
            }
            setProfile(null);
            settAcct(null);
        }
    },[profile, acct, logOut])

    const accountLogin = async () => {
        await setProfile(user);
        // backup profile in local storage on initial login
        window.localStorage.setItem("profile", JSON.stringify(user));
        console.log(user);
        // check to see if acct already exists
        const auth0_id = user.sub.split('|')[1];
        await getAcct(auth0_id);
        setLoggedIn(true);
    }

    // create new acct if necessary
    useEffect(() => {
        if (loggedIn && profile && !acct) {
            const auth0_id = profile.sub.split('|')[1];
            createAcct(auth0_id);
            alert('new user, creating new account...');
        }
    },[loggedIn, acct])

    const handleLogout = async () => {
        await setLogOut(true);
        logout({ returnTo: window.location.origin });
    }

    // handle routing once authenticated
    useEffect(() => {
        if (typeof window !== 'undefined' && profile) {
            if (acct) {
                console.log(acct);
                // alert('existing account');
                if (acct.status === 'pre-application') {
                    alert(`status is: [${acct.status}] redirecting to appplication page...`);
                }
                if (acct.status === 'applied') {
                    alert(`status is: [${acct.status}] redirecting dashboard page...`);
                }
                if (acct.status === 'approved') {
                    alert(`status is: [${acct.status}] redirecting to paymentpage...`);
                }
                if (acct.status === 'paid') {
                    alert(`status is: [${acct.status}] redirecting to dashboard to generate API key...`);
                }
            }
        }
    },[profile, acct])

    useEffect(() => {
        // is only truthy on initial login
        if (isAuthenticated) {
            accountLogin();
        }
    },[isAuthenticated])

    if (isLoading && !profile) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated || profile) {
        return (
          <div>
            Hello { profile ?  profile.name : user.name }
            <button onClick={() => handleLogout()}>
              Log out
            </button>
          </div>
        );
    } else {
        return <button onClick={loginWithRedirect}>Log in</button>;
    }
    }
