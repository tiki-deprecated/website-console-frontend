import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
  <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirectUri={process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URI}
  >
    <Component {...pageProps} />
  </Auth0Provider>
  ) 
}

export default MyApp
