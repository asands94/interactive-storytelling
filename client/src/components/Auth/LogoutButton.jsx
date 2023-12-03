import { Link } from 'react-router-dom'

const LogoutButton = () => {
  return (
    <Link to='http://localhost:3000/logout'>
      <button>Logout</button>
    </Link>
  )
}

export default LogoutButton
