import React, { useEffect, useState } from 'react';

import styles from '../styles/Application.module.css';

//POST https://api.hsforms.com/submissions/v3/integration/submit/9337300/ca9e267d-252d-40b5-95e6-d3983dd09ac0

function ApplicationForm(props) {
    const { profile, setApplied, updateAcct } = props;
    const [status, setStatus] = useState('default');

    //Form Values
    const [email, setEmail] = useState(profile.email);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [accessReason, setAccessReason] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleSubmit = async event => {
        event.preventDefault();

        setStatus('submitting');
        try {
            let response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/9337300/ca9e267d-252d-40b5-95e6-d3983dd09ac0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: [
                        {
                            "name": "email",
                            "value": email
                        },
                        {
                            "name": "firstname",
                            "value": firstName
                        },
                        {
                            "name": "lastname",
                            "value": lastName
                        },
                        {
                            "name": "company",
                            "value": company
                        },
                        {
                            "name": "api_access_reason",
                            "value": accessReason
                        }
                    ],
                    "context": {
                        "pageUri": window.location.href
                    }
                }),
            });

            if (response.ok) {
                setStatus('complete');
                setApplied(true);
                updateAcct(acct.auth0_id, 'status', 'applied');
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (err) {
            setStatus('error');
        }
    }

    useEffect(() => {
        if (firstName && lastName && company && accessReason) {
            setSubmitDisabled(false);
        }
        else {
            setSubmitDisabled(true);
        }
    })

    return (
        <div className={styles.applicationFormWrapper}>
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <div className={styles.row}>
                    <div className={styles.field, styles.fullWidth}>
                        <label htmlFor="emailInput" className="form-label">Email Address</label>
                        <input required type="email" className={styles.formInput + " form-control"} id="emailInput" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.field, styles.halfWidth}>
                        <label htmlFor="firstNameInput" className="form-label">First Name</label>
                        <input required type="text" className={styles.formInput + " form-control"} id="firstNameInput" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className={styles.field, styles.halfWidth}>
                        <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                        <input required type="text" className={styles.formInput + " form-control"} id="lastNameInput" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.field, styles.fullWidth}>
                        <label htmlFor="companyInput" className="form-label">Company Name</label>
                        <input required type="text" className={styles.formInput + " form-control"} id="companyInput" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.field, styles.fullWidth}>
                        <label htmlFor="companyInput" className="form-label">Why do you want access to our API?</label>
                        <textarea required className={styles.formInput + " form-control"} id="companyInput" value={accessReason} onChange={e => setAccessReason(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className={styles.formSubmit} disabled={submitDisabled || status === 'submitting'}>
                    {status === 'submitting' ? 'Submitting' : 'Submit Application'}
                </button>
                {status === 'error' && (
                    <div className={styles.FormError}>Something went wrong.</div>
                )}
            </form>
        </div>

    );
}

export default ApplicationForm;