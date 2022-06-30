import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setError("Password doesn't match")
      return
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value) //signup returns promise
      navigate('/')
    } catch (error) {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card >
          <Card.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <h2 className='text-center mb-4'>Sing Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required ref={emailRef}></Form.Control>
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required ref={passwordRef}></Form.Control>
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' required ref={passwordConfirmationRef}></Form.Control>
              </Form.Group>
              <Button disabled={loading} type='submit' className='w-100 mt-4'>Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Log In</Link>
        </div>
      </div>
    </Container>
  )
}

export default SignUp