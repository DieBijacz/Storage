import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { Link } from 'react-router-dom'

const FolderBreadCrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (currentFolder) path = [...path, ...currentFolder.path]

  return <Breadcrumb>
    {path.map((folder, index) => (
      <BreadcrumbItem key={folder.id} linkAs={Link} linkProps={{ to: folder.id ? `/folder/${folder.id}` : `/dashboard` }} className='text-truncate d-inline-block' style={{ maxWidth: '100px' }}>
        {folder.name}
      </BreadcrumbItem>
    ))}
    {currentFolder && (
      <BreadcrumbItem className='text-truncate d-inline-block' style={{ maxWidth: '200px' }} active>
        {currentFolder.name}
      </BreadcrumbItem>
    )}
  </Breadcrumb>
}

export default FolderBreadCrumbs