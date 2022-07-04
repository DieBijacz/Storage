import React from 'react'
import { Link } from 'react-router-dom'

const Navibar = () => {
  return (
    <div className='w-100 d-flex align-items-center' style={{ height: '10vh' }}>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Back to Home</Link>
    </div>
  )
}

export default Navibar