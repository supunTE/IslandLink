import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfEvqPIdM3U_-4ZFtrvPJkvyYUiJY8arI',
  authDomain: 'islandlink-df72b.firebaseapp.com',
  projectId: 'islandlink-df72b',
  storageBucket: 'islandlink-df72b.appspot.com',
  messagingSenderId: '433863315020',
  appId: '1:433863315020:web:3b0b2c2ed354db03c8aee9',
  measurementId: 'G-FTBV3DNZJ2'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
