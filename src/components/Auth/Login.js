import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// useAuth gives access to currentUser, Login and Logout after destructure
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  // below will pull out the value {login} from the value returned in useAuth()
  const { login } = useAuth()
  // below returns the user to a specific location
  const navigate = useNavigate()

  // This will send users back to homepage after login
  async function handleAuth() {
    await login()

    // returns users to homepage after login is successful
    return navigate('/')
  }

  return (
    <div className='login'>
      <article className="bg-info mb-5 p-5 text-dark">
        <h1 className="text-center">Welcome to DoItNow+</h1>
      </article>
      <Container>
        <Card.Header className="bg-dark text-center">
          <h2>Login</h2>
        </Card.Header>
        <Card.Body>
          <button className="btn btn-success" onClick={() => handleAuth()}>
            Login w/ GitHub
          </button>
        </Card.Body>
      </Container>
    </div>
  )
}
