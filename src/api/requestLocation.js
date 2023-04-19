import { getCords } from './getUserCords'

export async function requestLocation(long = 0, lat = 0) {
  // console.log('requestLocation', lat, long)
  try {
    let userCords
    if (lat && long) {
      userCords = [long, lat]
    } else {
      userCords = await getCords()
    }

    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/city`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: userCords[1],
        long: userCords[0]
      })
    })
    const data = await response.json()
    console.log(data)
    return data['city']
  } catch (error) {
    return null
  }
}
