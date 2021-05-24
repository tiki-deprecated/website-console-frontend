import { useState, createContext, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const [profile, setProfile] = useState()
    const [acct, setAcct] = useState();

    const getAcct = async (auth0_id) => {
        try{
            const res = await fetch(`/api/accts/[${auth0_id}]`);
            const response = await res.json();
            console.log('--- returned to store --');
            console.log(response);
            setAcct(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    const updateAcct = async (updatedAcctData) => {
        try{
            const res = await fetch('/api/update-acct', {
                method: 'PUT',
                body: JSON.stringify({
                        auth0_id: updatedAcctData.auth0_id,
                        account_status: updatedAcctData.account_status
                    }),
                headers: {'Content-Type': 'application/json'}
            });
            const updatedAcct = await res.json();
            setAcct(updatedAcct);
        } catch(err) {
            console.log(err);
        }
    }

    const createAcct = async (auth0_id) => {
        try{
            const res = await fetch(`/api/accts/[${auth0_id}]`, {
                method: 'POST',
                body: '',
                headers: {'Content-Type': 'application/json'}
            });
            const response = await res.json();
            setAcct(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    let store = { 
        loggedIn, 
        setLoggedIn,  
        logOut,
        setLogOut,
        profile, 
        setProfile,
        acct,
        setAcct,
        getAcct,
        updateAcct,
        createAcct,
    }

    // persist profile on page refresh
    useEffect(() => {
        // only run in browser
        if (typeof window !== 'undefined' && !logOut) {
            const localProfile = window.localStorage.getItem('profile');
            const localAcct = window.localStorage.getItem('profile');
            // backup valid context in localStorage
            if (profile) {
                window.localStorage.setItem('profile', JSON.stringify(profile));
                console.log('localProfile: ', localProfile);
                console.log('profile context is live, backing up in localSorage...');
            }
            if (acct) {
                window.localStorage.setItem('acct', JSON.stringify(acct));
                console.log('localAcct: ', localAcct);
                console.log('acct context is live, backing up in localSorage...');
            }
            // refresh context with localStorage
            if (!profile && localProfile) {
                setProfile(JSON.parse(localProfile));
                console.log('profile: ', profile);
                console.log('profile context is stale, refreshing from localStorage...');
            }   
            if (!acct && localAcct) {
                setProfile(JSON.parse(localAcct));
                console.log('acct: ', acct);
                console.log('acct context is stale, refreshing from localStorage...');
            }  
        }
        if (logOut) {
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
            }
            setProfile(null);
            settAcct(null);
        }
    },[profile, acct, logOut])    

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}