import React, { useState } from 'react';

import ApplicationForm from '../components/ApplicationForm';
import styles from '../styles/Application.module.css';

export default function Application() {
    const [applied, setApplied] = useState(false);
    
    return (
        <div className={styles.container}>
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
}
