import React, { useRef, useState } from 'react'
import { Card, Button, Container, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [updateErorr, setUpdateError] = useState('')
  const [loading, setLoading] = useState(false)
  const [displayProfileDetais, setDisplayProfileDetails] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { currentUser, logout, updateEmail, updatePassword } = useAuth()


  // HANDLE LOGOUT
  async function handleLogout() {
    setError('')
    try {
      setLoading(true)
      await logout()

      navigate('/login')
    } catch (error) {
      setError('Failed to logout')
      setLoading(false)
    }
  }

  // HANDLE UPDATE DETAILS
  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setUpdateError('')

    // array of promises so they can be executed at once
    const promises = []

    // validate password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setUpdateError("Password doesn't match")
      passwordRef.current.value = ''
      passwordConfirmRef.current.value = ''
      setTimeout(() => setUpdateError(''), 2000)
      console.log('problem with password')
      return
    }

    // if new email is present then updateEmail in firebase
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    if (promises.length > 0) {
      // Execute array of promises
      Promise.all(promises).then(() => {
        setMessage('Profile updated')
        setDisplayProfileDetails(false)

        setTimeout(() => setMessage(''), 2000)

      }).catch(() => {
        if (passwordRef.current.value.length <= 5) {
          setUpdateError("Password need's to be atleast 6 character's long")
          setTimeout(() => setUpdateError(''), 2000)
        } else {
          setError('Failed to update account')
          setTimeout(() => setError(''), 2000)
        }
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setUpdateError('To update profile please enter new email or password')
      setTimeout(() => setUpdateError(''), 2000)
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Alert variant='danger'>{error}</Alert>}
      {message && <Alert variant='success'>{message}</Alert>}

      <Container>
        <div className='d-flex justify-content-between align-items-center my-3'>
          <div>
            <h1 className='mb-0'>Dashboard</h1>
            <p className='mb-0'>{currentUser.email}<span className='text-muted'>- {currentUser.emailVerified ? 'verified' : 'not verified'}</span></p>
          </div>
          <div>
            <Button onClick={() => setDisplayProfileDetails(prev => prev === false ? true : false)}>{displayProfileDetais ? 'Hide details' : 'Update profile'}</Button>
            <Button className='ms-2' disabled={loading} onClick={handleLogout} variant='outline-primary'>{loading ? 'Loading...' : 'Log Out'}</Button>
          </div>
        </div>
        <div>
          {displayProfileDetais && (
            <div className='w-100% d-flex justify-content-end'>
              <Card className='m-3' style={{ width: 'calc(min(600px, 90%))' }}>
                <Card.Header><h4>Profile Details</h4></Card.Header>
                <Card.Body>
                  {updateErorr && <Alert variant='danger'>{updateErorr}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                      <Form.Label>New Email</Form.Label>
                      <Form.Control type='email' defaultValue={currentUser.email} ref={emailRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type='password' placeholder='Leave blank to keep the same password' ref={passwordRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id='passwordConfirm'>
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type='password' ref={passwordConfirmRef}></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Update Profile</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

export default Dashboard