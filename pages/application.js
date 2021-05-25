import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from '../context/store';
import ApplicationForm from '../components/ApplicationForm';
import authenticated from '../components/utils/authenticated';
import Loading from '../components/Loading';
import styles from '../styles/Application.module.css';

export default function Application() {
    const { profile, acct, setLogOut } = useAppContext();
    const { logout } = useAuth0();
    const [applied, setApplied] = useState(false);

    useEffect((profile) => {
        if (!authenticated(profile)) {
            setLogOut(true);
            logout({ returnTo: window.location.origin });
        }
    },[profile])



    if (profile) {
        return (
            <div className={styles.container}>
                {/* persistence test */}
                {console.log(acct)}
                <h3><i>{ profile ? profile.name : 'loading...' } is sitll logged in...</i></h3>

                <div className={styles.applicationBlock}>
                    <h1>Thank You For Your Interest</h1>

                    {!applied && (
                        <>
                            <h3>Please Apply to Become a Registered Developer</h3>
                            <ApplicationForm />
                        </>
                    )}
                    {applied && (
                        <>
                            <h3>Thank You For Applying!</h3>
                            <p>Your application is being processed and you will be notified by email when you have been approved.</p>
                        </>
                    )}
                </div>
                <button className={styles.demoButton} onClick={() => setApplied(!applied)}>Toggle Applied Status</button>
            </div>
        )
    } else return <Loading/>
}
