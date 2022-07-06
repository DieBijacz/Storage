import React from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()
  return (
    <Container>
      <h2>Home Page</h2>
    </Container>
  )
}

export default Home