import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
  <Auth0Provider
    domain="dev-azwil67y.us.auth0.com"
    clientId="GxRSF2rhyFgmYk29IOyrkgNj85vFQbHl"
    redirectUri={"http://localhost:3000"}
  >
    <Component {...pageProps} />
  </Auth0Provider>
  ) 
}

export default MyApp
