import { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [profile, setProfile] = useState()
    const [acct, setAcct] = useState();
    const [logOut, setLogOut] = useState(false)

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
            const res = await fetch('/api/accts/[${auth0_id}]', {
                method: 'POST',
                body: '',
                headers: {'Content-Type': 'application/json'}
            });
            const newAcct = await res.data.json();
            setAcct(newAcct);
        } catch(err) {
            console.log(err);
        }
    }

  let store = {
      profile, 
      setProfile,
      acct,
      setAcct,
      getAcct,
      updateAcct,
      createAcct,
      logOut,
      setLogOut
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