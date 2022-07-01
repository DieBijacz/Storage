import { Alert } from 'bootstrap'
import React, { useState } from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    setError('')
    try {
      setLoading(true)
      await logout()
      console.log('1')

      navigate('/login')
    } catch (error) {
      setError('Failed to logout')
    }
  }

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Container>
        <div className="top">
          <div className='d-flex justify-content-between align-items-center my-3'>
            <div>
              <h1>Profile</h1>
              <p>{currentUser.email}<span className='text-muted'>- {currentUser.emailVerified ? 'verified' : 'not verified'}</span></p>
            </div>
            <Button disabled={loading} onClick={handleLogout} variant='outline-primary'>{loading ? 'Loading...' : 'Log Out'}</Button>
          </div>
        </div>
        <Button onClick={() => navigate('/profile')}>Update Profile</Button>
      </Container>
    </>
  )
}

export default Dashboard