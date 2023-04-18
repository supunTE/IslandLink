import {
  collection,
  getDocs,
  getDoc,
  doc,
  limit,
  query
} from 'firebase/firestore'
import { db } from '../firebase'

export async function loadCommunityData() {
  const communityCollection = collection(db, 'community')
  const q = query(communityCollection, limit(20))
  const docs = await getDocs(q)

  const communityData = []
  await Promise.all(
    docs.docs.map(async (doc) => {
      const data = doc.data()

      const userData = await loadUserData(data.id)
      const dateAndTime = convertTimestampToDate(data.time)

      if (data.type === 'question') {
        const answeredUserData = await loadUserData(data.topAnswerUserId)

        const commData = {
          postId: doc.id,
          dateAndTime,
          user: {
            image: userData.image,
            name: userData.name
          },
          answeredUser: {
            image: answeredUserData.image,
            name: answeredUserData.name
          },
          ...data
        }
        communityData.push(commData)
      } else if (data.type === 'post') {
        const commData = {
          postId: doc.id,
          dateAndTime,
          user: {
            image: userData.image,
            name: userData.name
          },
          ...data
        }
        communityData.push(commData)
      }
    })
  )

  return communityData
}

const loadUserData = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId))
  const userData = userDoc.data()
  return userData
}

function convertTimestampToDate(timestamp) {
  // Convert Firestore Timestamp to JavaScript Date object
  const date = new Date(timestamp.seconds * 1000)

  const formattedTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const formattedDateTime = `${formattedTime} on ${formattedDate}`

  return formattedDateTime.toString()
}
