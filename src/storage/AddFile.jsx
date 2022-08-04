import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { storage, database } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'

const AddFile = ({ currentFolder }) => {
  const { currentUser } = useAuth()

  // SUBMIT UPLOAD FILE
  function handleSubmit(e) {
    const file = e.target.files[0]
    // validate input
    if (currentFolder == null || file == null) return

    // create path to file based on folders
    const filePath = currentFolder.path.length > 0
      ? `${currentFolder.path.reduce((acc, path) => acc += `${path.name}/`, '')}${currentFolder.name}/${file.name}`
      : file.name

    // REFERENCE files / user id / file path
    const storageRef = ref(storage, `files/${currentUser.uid}/${filePath}/`)

    // upload
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('unauthorized')
            break;
          case 'storage/canceled':
            console.log('canceled')
            break;
          case 'storage/unknown':
            console.log('unknown')
            break;
        }
      },
      () => {
        // After uploading file to firebase storage
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
      }
    );
  }

  return (
    <div>
      <label className='btn btn-outline-success m-0 me-2'>
        Add File
        <FontAwesomeIcon icon={faFileUpload} className='ms-2' />
        <input type='file' onChange={(e) => handleSubmit(e)} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} />
      </label>
    </div>
  )
}

export default AddFile