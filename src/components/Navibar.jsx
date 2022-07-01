import React from 'react'
import { Link } from 'react-router-dom'

const Navibar = () => {
  return (
    <>
      <div className='w-100 p-2'>
        <Link to='/' style={{ textDecoration: 'none' }}>Back to Home</Link>
      </div>
    </>
  )
}

export default Navibar