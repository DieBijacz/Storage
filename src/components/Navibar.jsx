import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navibar = () => {
  const { currentUser } = useAuth()

  return (
    <Navbar bg='light' style={{ height: '50px' }} className='mb-3'>
      <Container>
        <Navbar.Brand as={Link} to='/'>MasStorage</Navbar.Brand>
        <Nav>
          <Nav>
            {currentUser ?
              <>
                <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
              </>
              :
              <Nav.Link as={Link} to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Nav.Link>
            }
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navibar