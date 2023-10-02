import './App.css'
import { Auth0Provider } from '@auth0/auth0-react'
import Profile from './components/Profile'
import UploadFile from './UploadFile'
import Authentication from './components/Authentication'




function App() {
  return (

    <>
      {/* Auth0Provider needs to wrap around the entire application, based on recommendation from Auth0 */}
      <Auth0Provider
        domain={import.meta.env.VITE_REACT_APP_DOMAIN_ID}
        clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Authentication />
        <Profile />
        <UploadFile />
      </Auth0Provider>

    </>
  )


}

export default App