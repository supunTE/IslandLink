import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export async function getComments(id) {
  const commentsCollection = collection(db, 'services', id, 'comments')
  const comments = await getDocs(commentsCollection)
  const commentsArr = []
  comments.forEach((comment) => {
    const data = comment.data()
    commentsArr.push(data)
  })
  return commentsArr
}
