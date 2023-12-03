import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link to='http://localhost:3000/auth/google'>
      <button>Login Please</button>
    </Link>
  )
}

export default LoginButton
