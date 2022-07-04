import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)

      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/dashboard')
    } catch (error) {
      setError('Failed to log in')
      setTimeout(() => {
        setError('')
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card >
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h2 className='text-center mb-4'>Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required ref={passwordRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} type='submit' className='w-100 mt-4'>Log In</Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-2">
          <Link to='/forgot-password' style={{ textDecoration: 'none' }}>Forgot Password?</Link>
        </div>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/signup' style={{ textDecoration: 'none' }}>Create Account</Link>
      </div>
    </div>
  )
}

export default Login