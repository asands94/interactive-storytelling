const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}/`

export const index = async () => {
  const res = await fetch(BASE_URL, { method: 'GET' })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Invalid Request')
  }
}
