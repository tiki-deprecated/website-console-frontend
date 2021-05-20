import '../styles/globals.css'

import { AppWrapper } from '../context/store';
import { Auth0Provider } from '@auth0/auth0-react';
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URI}
      >
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"></link>
    
    <Navigation/>
    <div className="pageWrapper">
        <Component {...pageProps} />
        </div>
      </Auth0Provider>
    </AppWrapper>
  ) 
}

export default MyApp




// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }