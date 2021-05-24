import React, { useEffect } from 'react';
import { useAppContext } from '../context/store';
import styles from '../styles/Home.module.css'

export default function ExampleUpdate() {
    const { profile, acct, updateAcct } = useAppContext();


    const updateStatus = (updateStatus) => {
        updateAcct(acct.auth0_id, 'status', updateStatus);
    }


    return (
        <>
            {/* persistence test */}
            <h3><i>{ profile ? profile.name : 'loading...' } is sitll logged in...</i></h3>

            <br/><br/>
            <button
                onClick={() => updateStatus('applied')}
            >
            Apply 
            </button>
            <br/><br/>
            <br/><br/>
            <button
                onClick={() => updateStatus('paid')}
            >
            Pay
            </button>
        </>
    )
}
