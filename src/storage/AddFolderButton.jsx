import React, { useState } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { database } from '../firebase'
import { useAuth } from '../context/AuthContext'

const AddFolderButton = ({ currentFolder }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const { currentUser } = useAuth()

  // MODAL
  function openModal() {
    setOpen(true)
  }
  function closeModal() {
    setOpen(false)
  }

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault()

    if (currentFolder == null) return

    // add folder to database
    database.folders.add({
      userId: currentUser.uid,
      name,
      parentId: currentFolder.id,
      createdAt: database.getCurrentTimestamp
    })

    // reset states
    setName('')
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant='outline-success' size='sm' >
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button >
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FormGroup>
              <div className='d-flex justify-content-between align-items-center'>
                <Form.Label>Folder Name</Form.Label>
                <Button onClick={closeModal} variant='outline'>
                  <FontAwesomeIcon icon={faTimes} size='sm' />
                </Button>
              </div>
              <Form.Control onFocus={() => setName('')} type='text' required value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='success'><FontAwesomeIcon icon={faPlus} size='sm' /> Add Folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddFolderButton