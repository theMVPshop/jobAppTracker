import './App.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './components/Profile'
import UploadFile from './UploadFile'
import Authentication from './components/Authentication'


function App() {
  return (

    <>
      {/* Auth0Provider needs to wrap around the entire application, based on recommendation from Auth0 */}
      <Auth0Provider
        domain="dev-qxzngmucus86xphq.us.auth0.com"
        clientId="s6f9hSpUxFolZsfQ7sNhD9JIO2s39fYl"
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