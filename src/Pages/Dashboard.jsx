import React from 'react'
import { Container } from 'react-bootstrap'
import Folder from '../components/Folder'
import useFolder from '../hooks/useFolder'
import AddFolderButton from '../storage/AddFolderButton'

const Dashboard = () => {
  const { folder, childFolders } = useFolder('Xs2MeDr3LsfAPtw4zTZE')
  console.log(childFolders)

  return (
    <Container fluid>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Dashboard <span className='text-muted'>({childFolders.length})</span></h1>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        {childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '250px' }} className='p-2'>
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        <AddFolderButton currentFolder={folder} />
      </div>
    </Container>
  )
}

export default Dashboard