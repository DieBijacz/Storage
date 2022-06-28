import React, { useRef } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    signup(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>Sing Up</h2>
          <Form>
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
            <Button type='submit' className='w-100'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </div>
  )
}

export default SignUp