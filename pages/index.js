import Head from 'next/head';
import React from 'react';
import styles from '../styles/Index.module.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginBlock}>
          <h1>Welcome to the Tiki Developer Portal!</h1>
          <h3>Hello {user.name}{' '}</h3>
          <button className={styles.loginButton} onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
        </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.loginBlock}>
          <h1>Welcome to the Tiki Developer Portal!</h1>
          <h3>Please Log In to Continue</h3>
          <button className={styles.loginButton} onClick={loginWithRedirect}>Log in</button>
        </div>
      </div>
    )

  }
}
