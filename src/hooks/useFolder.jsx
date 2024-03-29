import { useEffect, useReducer } from 'react'
import { useAuth } from '../context/AuthContext'
import { database } from '../firebase'

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files'
}

export const ROOT_FOLDER = {
  name: 'Root',
  id: null,
  path: []
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders
      }
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles
      }


    default:
      return state
  }
}

const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    // default state
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  const { currentUser } = useAuth()

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER }
      })
    }

    database.folders.doc(folderId).get()
      .then(doc => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) }
        })
      })
      .catch(() => dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER }
      }))

  }, [folderId])

  // FOLDERS
  useEffect(() => {
    return database.folders
      .where("parentId", "==", folderId) //check parent folder
      .where("userId", "==", currentUser.uid) //check user
      .orderBy("createdAt") //format in order
      .onSnapshot(snapshot => { //trigers update folders when they change
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) }
        })
      })
  }, [folderId, currentUser])

  // FILES
  useEffect(() => {
    return database.files
      .where("folderId", "==", folderId) //check folder
      .where("userId", "==", currentUser.uid) //check user
      .orderBy("createdAt") //format in order
      .onSnapshot(snapshot => { //trigers update files when they change
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) }
        })
        console.log({ childFiles: snapshot.docs.map(database.formatDoc) })
      })
  }, [folderId, currentUser])
  return state
}

export default useFolder