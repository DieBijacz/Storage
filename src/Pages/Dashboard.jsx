import React from 'react'
import { Container } from 'react-bootstrap'
import Folder from '../components/Folder'
import useFolder from '../hooks/useFolder'
import AddFolderButton from '../storage/AddFolderButton'
import AddFile from '../storage/AddFile'
import { useParams, Link } from 'react-router-dom'
import FolderBreadCrumbs from '../components/FolderBreadCrumbs'

const Dashboard = () => {
  const { folderId } = useParams() // get current folder which is open in dashboard
  const { folder, childFolders } = useFolder(folderId)

  return (
    <Container fluid>
      <div>
        <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}><h1>Dashboard<span className='text-muted'>({childFolders.length})</span></h1></Link>
        <div className='d-flex align-items-center justify-content-between'>
          <FolderBreadCrumbs currentFolder={folder} />
          <div className='d-flex align-items-center'>
            <AddFile currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        {childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '200px' }} className='me-2'>
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Dashboard