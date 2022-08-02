import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { storage } from '../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'
import { Button, Form, Modal } from 'react-bootstrap'

const AddFile = ({ currentFolder }) => {
  const { currentUser } = useAuth()
  const [fileForUpload, setFileForUpload] = useState(null)
  const [open, setOpen] = useState(false)

  // MODAL
  function openModal(e) {
    setFileForUpload(e.target.files[0])
    setOpen(true)
  }
  function closeModal() {
    setOpen(false)
    setFileForUpload(null)
  }

  console.log(fileForUpload)

  function handleSubmit() {
    // validate input
    if (currentFolder == null || fileForUpload == null) return

    // create path to file based on folders
    const filePath = currentFolder.path.length > 0
      ? `${currentFolder.path.reduce((acc, path) => acc += `${path.name}/`, '')}/${currentFolder.name}/${fileForUpload.name}`
      : fileForUpload.name

    // files / user id / file path
    const storageRef = ref(storage, `files/${currentUser.uid}/${filePath}/`)

    // upload
    uploadBytes(storageRef, fileForUpload).then(() => {
      alert('File Uploaded')
      setFileForUpload(null)
    }).catch(error => console.log(error))
  }

  return (
    <div>
      <label className='btn btn-outline-success m-0 me-2'>
        Add File
        <FontAwesomeIcon icon={faFileUpload} className='ms-2' />
        <input type='file' onChange={(e) => openModal(e)} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
      </label>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              {fileForUpload &&
                <div className='d-flex justify-content-between align-items-center'>
                  <p>{fileForUpload?.name}</p>
                  <p className='text-muted'>{fileForUpload.size}B</p>
                </div>
              }
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-dark' onClick={() => closeModal()}>Cancel</Button>
            <Button type='submit' variant='success'>Add File</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default AddFile