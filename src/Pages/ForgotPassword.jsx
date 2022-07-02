import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // reset states
      setError('')
      setMessage('')
      setLoading(true)

      // call resetPassword and show message when succesfully
      await resetPassword(emailRef.current.value)
      console.log('here')
      setMessage('Check your inbox for futher insctructions')

    } catch (error) {
      setError('Failed to reset password')
      setTimeout(() => {
        setError('')
        setMessage('')
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card >
          <Card.Body>
            {message && <Alert variant='success'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            <h2 className='text-center mb-4'>Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required ref={emailRef}></Form.Control>
              </Form.Group>
              <Button disabled={loading} type='submit' className='w-100 mt-4'>Send</Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mb-2">
            <Link to='/login' style={{ textDecoration: 'none' }}>Go To Login</Link>
          </div>
        </Card>

      </div>
    </Container>
  )
}

export default ForgotPassword