export function getCords() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.longitude, position.coords.latitude]
          resolve(location)
        },
        (error) => {
          reject(error)
        }
      )
    } else {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
  })
}
