import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <>
      <Link to={`${import.meta.env.VITE_APP_BASE_URL}/auth/google`}>
        <button>Login With Google</button>
      </Link>
    </>
  )
}

export default LoginButton
