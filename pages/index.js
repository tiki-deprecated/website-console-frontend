import React, { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { useAppContext } from '../context/store';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const accountLogin = async () => {
        await setProfile(user);
        // backup profile in local storage on initial login
        window.localStorage.setItem("profile", JSON.stringify(user));
        console.log(user);
        // check to see if acct already exists
        const auth0_id = user.sub.split('|')[1];
        await getAcct(auth0_id);
        setLoggedIn(true); // only used for initial login / acct creation
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
                    router.push('/application');
                }
                if (acct.status === 'applied') {
                    router.push('/dashboard');
                }
                if (acct.status === 'approved') {
                    router.push('/payment');
                }
                if (acct.status === 'paid') {
                    router.push('/dashboard');;
                }
                if (acct.status === 'denied') {
                    toast.dark("Sorry, you applicaiton was denied, now logging you out.");
                    setTimeout(() => {
                        handleLogout();
                    }, 5000);  
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
            <>
            <div>
                <ToastContainer /> 
            </div>
            <div className={styles.container}>
                <div className={styles.loginBlock}>
                    <h1>Welcome to the Tiki Developer Portal!</h1>
                    <h3>Hello { profile ?  profile.name : user.name }</h3>
                    <button className={styles.loginButton} onClick={() => handleLogout()}>
                    Log out
                    </button>
                </div>
          </div>
        </>
        );
    } else {
        return (
            <div className={styles.container}>
        <div className={styles.loginBlock}>
          <h1>Welcome to the Tiki Developer Portal!</h1>
          <h3>Please Log In to Continue</h3>
          <button className={styles.loginButton} onClick={loginWithRedirect}>Log in</button>
        </div>
      </div>
        );
    }
}
