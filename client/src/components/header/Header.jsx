import LoginButton from '../Auth/LoginButton'
import LogoutButton from '../Auth/LogoutButton'

const Header = () => {
  return (
    <header>
      <LogoutButton />
      <LoginButton />
    </header>
  )
}

export default Header
