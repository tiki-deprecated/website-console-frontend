import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from '../context/store';
import ApplicationForm from '../components/ApplicationForm';
import authenticated from '../components/utils/authenticated';
import Loading from '../components/Loading';
import styles from '../styles/Application.module.css';

export default function Application() {
    const { profile, acct, setLogOut, updateAcct } = useAppContext();
    const { logout } = useAuth0();
    const [applied, setApplied] = useState(false);

    useEffect((profile) => {
        if (!authenticated(profile)) {
            setLogOut(true);
            logout({ returnTo: window.location.origin });
        }
        if (acct) {
            if (acct.status != 'pre-application') {
                setApplied(true);
            }
        }

    }, [profile])



    if (profile) {
        return (
            <div className={styles.container}>
                {console.log(acct)}
                <div className={styles.applicationBlock}>
                    {!applied && (
                        <>
                            <h1>Thank You For Your Interest</h1>
                            <h3>Please Apply to Become a Registered Developer</h3>
                            <ApplicationForm profile={profile} setApplied={setApplied} updateAcct={updateAcct}/>
                        </>
                    )}
                    {applied && (
                        <>
                            <h1>Thank You For Applying!</h1>
                            <h4>Your application is being processed and you will be notified by email when you have been approved.</h4>
                        </>
                    )}
                </div>
                <button className={styles.demoButton} onClick={() => setApplied(!applied)}>Toggle Applied Status</button>
            </div>
        )
    } else return <Loading />
}
