import { getCords } from './getUserCords'

export async function getDistance(destLong, destLat) {
  try {
    const userCords = await getCords()
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/distance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          sourceLong: userCords[0],
          sourceLat: userCords[1],
          destLong,
          destLat
        })
      }
    )

    const data = await response.json()
    return data['distance']
  } catch (error) {
    return null
  }
}
