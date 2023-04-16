import { getCords } from './getUserCords'

export async function requestLocation() {
  try {
    const userCords = await getCords()
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/city`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: userCords[0],
        long: userCords[1]
      })
    })
    const data = await response.json()
    return data['city']
  } catch (error) {
    return null
  }
}
