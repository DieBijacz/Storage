import React from 'react'
import { Container } from 'react-bootstrap'
import AddFolderButton from '../storage/AddFolderButton'

const Dashboard = () => {
  return (
    <Container fluid>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Dashboard</h1>
        <AddFolderButton />
      </div>
    </Container>
  )
}

export default Dashboard