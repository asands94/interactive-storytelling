import React, { useEffect } from 'react'

const OAuthCallback = () => {
  useEffect(() => {
    // Make a request to the server's OAuth callback route
    fetch('http://localhost:3000/oauth2callback')
      .then((response) => response.json())
      .then((data) => {
        // Extract the redirectTo information from the JSON response
        const { redirectTo } = data

        // Perform the client-side redirection when redirectTo is available
        if (redirectTo) {
          window.location.href = redirectTo
        }
      })
      .catch((error) => {
        console.error('Error fetching OAuth callback:', error)
      })
  }, [])

  return (
    <div>
      <p>Processing OAuth callback...</p>
    </div>
  )
}

export default OAuthCallback
