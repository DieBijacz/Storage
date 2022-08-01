import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
})

const firestore = app.firestore()

export const database = {
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),
  formatDoc: doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp()
}
export const storage = getStorage(app)
export const auth = app.auth()
export default app