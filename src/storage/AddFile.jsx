import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { storage } from '../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

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

  function handleSubmit() {
    // validate input
    if (currentFolder == null || fileForUpload == null) return

    // create Reference to my firebase storage and path
    const storageRef = ref(storage, `uploaded files/${currentUser.uid}/`)

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
              {fileForUpload?.name}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='success'>Add File</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default AddFile