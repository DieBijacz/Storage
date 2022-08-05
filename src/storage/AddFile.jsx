import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { storage, database } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Toast, ProgressBar } from 'react-bootstrap'

const AddFile = ({ currentFolder }) => {
  const { currentUser } = useAuth()
  const [uploadingFiles, setUploadingFiles] = useState([])

  // SUBMIT UPLOAD FILE
  function handleSubmit(e) {
    const file = e.target.files[0]
    // validate input
    if (currentFolder == null || file == null) return

    const id = uuidV4()
    setUploadingFiles(prev => [...prev, { id, name: file.name, progress: 0, error: false }])

    // create path to file based on folders
    const filePath = currentFolder.path.length > 0
      ? `${currentFolder.path.reduce((acc, path) => acc += `${path.name}/`, '')}${currentFolder.name}/${file.name}`
      : file.name

    // REFERENCE files / user id / file path
    const storageRef = ref(storage, `files/${currentUser.uid}/${filePath}/`)

    // upload
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      // PROGRESSBAR
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingFiles(prev => {
          return prev.map(file => {
            if (file.id === id) {
              return { ...file, progress }
            }
            return file
          })
        })
      },
      // ERROR
      () => {
        setUploadingFiles(prev => {
          return prev.map(file => {
            if (file.id === id) {
              return { ...file, error: true }
            }
            return file
          })
        })
      },
      // WHEN FINISHED
      () => {
        // Create object with refrence to that file and add it to database
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('uploaded')
          database.files.add({
            url: downloadURL,
            name: file.name,
            createdAt: new Date(),
            folderId: currentFolder.id,
            userId: currentUser.uid
          })
        });
        setUploadingFiles(prev => {
          return prev.filter(file => file.id != id)
        })
      }
    );
  }

  return (
    <>
      <label className='btn btn-outline-success m-0 me-2'>
        Add File
        <FontAwesomeIcon icon={faFileUpload} className='ms-2' />
        <input type='file' onChange={(e) => handleSubmit(e)} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', maxWidth: '250px' }}>
            {uploadingFiles.map(file => (
              <Toast key={file.id} onClose={() => setUploadingFiles(prev => prev.filter(f => f.id !== file.id))}>
                <Toast.Header className='text-truncate w-100 d-block' closeButton={file.error}>
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    variant={file.error ? 'danger' : 'primary'}
                    animated={!file.error}
                    now={file.error ? 100 : file.progress * 100}
                    label={file.error ? 'Error' : `${Math.round(file.progress * 100)}%`}
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>, document.body)
      }
    </>
  )
}

export default AddFile