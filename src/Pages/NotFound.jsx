import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h2>Sorry</h2>
      <p>That page can not be found</p>
      <Link to='/'>Go To Home Page</Link>
    </>
  )
}

export default NotFound