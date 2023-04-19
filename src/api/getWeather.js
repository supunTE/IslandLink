import { getCords } from './getUserCords'

export async function getWeather() {
  try {
    const userCords = await getCords()
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/weather`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          long: userCords[0],
          lat: userCords[1]
        })
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    return null
  }
}
