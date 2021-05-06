import ApplicationForm from '../components/ApplicationForm';
import React from 'react';
import styles from '../styles/Application.module.css';

export default function Application(){
    return (
        <div className={styles.container}>
            <div className={styles.applicationBlock}>
                <h1>Thank You For Your Interest</h1>
                <h3>Please Apply to Become a Registered Developer</h3>
                <ApplicationForm/>
            </div>
        </div>
    )
}
