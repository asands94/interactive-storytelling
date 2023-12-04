import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()

  console.log(id)
  return <h1>Hello!</h1>
}

export default Profile
