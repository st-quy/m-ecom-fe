/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTokenDecoding } from '~/helpers/api'
function MyComponent(): JSX.Element {
  const [accessToken, decodedToken] = useTokenDecoding()

  return (
    <div>
      {decodedToken ? (
        <div>
          <h2>Decoded Token:</h2>
          <p>ID: {decodedToken.id}</p>
          <p>Phone Number: {decodedToken.phoneNumber}</p>
          <p>Name: {decodedToken.name}</p>
          <p>Refresh Token: {decodedToken.refreshToken}</p>
          <p>Role ID: {decodedToken.role}</p>
        </div>
      ) : (
        <p>No access token found.</p>
      )}
    </div>
  )
}

export default MyComponent
