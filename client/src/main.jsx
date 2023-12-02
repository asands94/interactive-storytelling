import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='dev-trv-jqp4.us.auth0.com'
    clientId='PrjwpzH74AsyKupmX65cn2oy6OQzs7p3'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
)
