import HubspotForm from 'react-hubspot-form';
import React from 'react';
import styles from '../styles/Application.module.css';

function ApplicationForm() {
 
  return (
      <div className={styles.applicationForm}>
          <HubspotForm
              portalId="14527441"
              formId="b8efd8e3-d94e-407f-b000-0828731abafe"
              loading={<div>Loading...</div>}
          />
      </div>
   
  );
}

export default ApplicationForm;