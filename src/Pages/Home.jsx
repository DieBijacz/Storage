import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
      <h2>Home Page</h2>
      <Link to='/login'>Go To Login</Link>
    </div>
  )
}

export default Home