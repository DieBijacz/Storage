import React from 'react'
import { Container } from 'react-bootstrap'
import useFolder from '../hooks/useFolder'
import AddFolderButton from '../storage/AddFolderButton'

const Dashboard = () => {
  const { folder } = useFolder('Xs2MeDr3LsfAPtw4zTZE')
  console.log(folder)

  return (
    <Container fluid>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Dashboard</h1>
        <AddFolderButton currentFolder={folder} />
      </div>
    </Container>
  )
}

export default Dashboard