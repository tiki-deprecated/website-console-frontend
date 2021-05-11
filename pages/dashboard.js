import Link from 'next/link';
import ReadmeLogin from '../components/ReadmeLogin';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {

    return (
        <div className={styles.container}>
            <h1>Account Dashboard</h1>
            <div className={styles.dashboardContainer}>
                <h5>Payment Status: <span className={styles.complete}>Complete</span></h5>
                <h5>API Access: <span className={styles.incomplete}>Incomplete</span></h5>
                <Link href='/dashboard'><a><h6 className={styles.link}>Generate Your API Keys</h6></a></Link>
                <h5>View the docs:</h5>
                <ReadmeLogin/>
            </div>
            
        </div>
        // 'holler-back!!'
    );

}