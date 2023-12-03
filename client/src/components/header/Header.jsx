import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../Auth/LoginButton'
import LogoutButton from '../Auth/LogoutButton'

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  return (
    <header>
      {!isLoading ? isAuthenticated ? <LogoutButton /> : <LoginButton /> : null}
    </header>
  )
}

export default Header
