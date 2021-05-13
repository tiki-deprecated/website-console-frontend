import { Accordion, Button, Card } from 'react-bootstrap';

import Link from 'next/link';
import ReadmeLogin from '../components/ReadmeLogin';
import styles from '../styles/Dashboard.module.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Dashboard() {
    const {
        isAuthenticated,
    } = useAuth0();

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Account Dashboard</h1>
            <div className={styles.dashboardContainer}>
                <h4 className={styles.sectionTitle}>Account Setup</h4>
                <Accordion>
                    <Card>
                        <Accordion.Toggle className={styles.accordionToggle} as={Card.Header} eventKey="0">
                            <h5>Payment Status: <span className={styles.complete}>Complete</span></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className={styles.accordionBody}>
                                <h6>Payment History</h6>
                                <p>5/1/2021 - $1</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle className={styles.accordionToggle} as={Card.Header} eventKey="1">
                            <h5>API Access: <span className={styles.incomplete}>Incomplete</span></h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body className={styles.accordionBody}>
                                <Link href='/dashboard'><a><h6 className={styles.link}>Generate Your API Keys</h6></a></Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>



                <h4 className={styles.sectionTitle}>Documentation</h4>
                <ReadmeLogin />
            </div>

        </div>
        // 'holler-back!!'
    );

}