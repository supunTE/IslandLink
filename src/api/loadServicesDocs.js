import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../firebase'

export async function loadServicesDocs() {
  const servicesCollection = collection(db, 'services')
  const q = query(servicesCollection, limit(20))
  const docs = await getDocs(q)

  const servicesData = []
  docs.forEach(async (doc) => {
    const data = doc.data()

    const serviceData = {
      id: doc.id,
      // TODO: should change pricePerHour => price Later
      pricePerDay:
        data.type === 'cospace'
          ? data.pricePerHour * 24
          : data.type === 'restaurant'
          ? 0
          : data.pricePerHour || 0,
      ...data,
      distance: 0
    }

    servicesData.push(serviceData)
  })

  return servicesData
}
