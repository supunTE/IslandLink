import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export async function loadOneService(id) {
  const serviceDoc = doc(db, 'services', id)
  const docSanp = await getDoc(serviceDoc)
  return docSanp.data()
}
