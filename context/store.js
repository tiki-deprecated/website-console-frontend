import { useState, createContext, useContext } from 'react';

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

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}