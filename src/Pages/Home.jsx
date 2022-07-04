import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <h2>Home Page</h2>
      {currentUser ?
        <Link to='/dashboard'>Dashboard</Link>
        :
        <Link to='/login'>Go To Login</Link>
      }
    </>
  )
}

export default Home