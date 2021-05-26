import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Accordion, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAppContext } from '../context/store';
import ReadmeLogin from '../components/ReadmeLogin';
import styles from '../styles/Dashboard.module.css';
import authenticated from '../components/utils/authenticated';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Dashboard() {
    const { profile, acct, setLogOut, genKey } = useAppContext();
    const { logout } = useAuth0();
    const [viewKey, setViewKey] = useState(false);

    useEffect((profile) => {
        if (!authenticated(profile)) {
            setLogOut(true);
            logout({ returnTo: window.location.origin });
        }
    },[profile])

    const handleKeyGen = async () => {
        const { auth0_id } = acct;
        await genKey(auth0_id);
        toast.dark("New 👋, API Key Generated!");
        setViewKey(false);
    }

    const copyKeyToClipboard = () => {
        navigator.clipboard.writeText(acct.api_key);
        setViewKey(false);
    }
    

    if (profile) {
        return (
            <>
            <ToastContainer /> 
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Account Dashboard</h1>
                <div className={styles.dashboardContainer}>
                    <h4 className={styles.sectionTitle}>Account Setup</h4>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle className={styles.accordionToggle} as={Card.Header} eventKey="0">
                                <h5>Payment Status: <span className={acct.status === 'paid' ? styles.complete : styles.incomplete}>{acct.status === 'paid' ? 'Complete' : 'InComplete'}</span></h5>
                            </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        { acct.status === 'paid' && 
                                            <Card.Body className={styles.accordionBody}>
                                                <h6>Payment History</h6>
                                                <p>5/1/2021 - $1</p>
                                            </Card.Body>
                                        }   
                                        { acct.status !== 'paid' &&
                                            <Card.Body className={styles.accordionBody}>
                                                <Link href='/payment'><a><h6 className={styles.link}>Make Nominal Payment</h6></a></Link>
                                            </Card.Body>
                                        }
                                    </div>
                                </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle className={styles.accordionToggle} as={Card.Header} eventKey="1">
                                <h5>API Access: <span className={acct.api_key ?  styles.complete : styles.incomplete}>{ acct.api_key ? 'Complete' : 'Incomplete'}</span></h5>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <div>
                                    { acct.status === 'paid' && 
                                        <Card.Body className={styles.accordionBody}>
                                            <Link href='/dashboard'><a><h6  onClick={() => handleKeyGen()} className={styles.link}>{acct.api_key ? 'Generate New API Key' : 'Generate API Key'}</h6></a></Link>
                                        </Card.Body>   
                                    } 
                                    {   acct.status !== 'paid' &&
                                        <Card.Body className={styles.accordionBody}>
                                            <h6>Sorry, you can only access the API once your application has been approved and you have paid the nominal fee. &#128522;</h6>
                                        </Card.Body>  
                                    }                          
                                    { acct.api_key &&
                                        <span>   
                                            <Card.Body className={styles.accordionBody}>
                                                <Link href='/dashboard'><a><h6  onClick={() => !viewKey ? setViewKey(true) : setViewKey(false)} className={styles.link}>{!viewKey ? 'View API Key' : 'Hide API Key'}</h6></a></Link>
                                                <input
                                                    disabled
                                                    size="50"
                                                    placeholder={viewKey ? acct.api_key : '++++++++++++++++++++++++++++++++++++++++++'}
                                                    name="api_key"
                                                />  
                                                { viewKey &&
                                                    <button
                                                        onClick={() => copyKeyToClipboard()}
                                                    >copy</button>
                                                }
                                            </Card.Body>
                                        </span>
                                    }
                                </div>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    { acct.api_key &&
                        <div>    
                            <h4 className={styles.sectionTitle}>Documentation</h4>
                            <ReadmeLogin />
                        </div>
                    }
                </div>
            </div>
        </>
        );
    } else return <Loading />
}
