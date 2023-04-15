export function getUserLocation(lat, long) {
  return new Promise((resolve, reject) => {
    const endpoint = 'https://api.openrouteservice.org/geocode/reverse'
    /* eslint-disable-next-line  */
    const apiKey = import.meta.env.VITE_OPEN_ROUTE

    // Send API request
    fetch(
      `${endpoint}?api_key=${apiKey}&point.lon=${long}&point.lat=${lat}&boundary.country=LK`
    )
      .then((response) => response.json())
      .then((result) => {
        const cityName = result.features[0].properties.county
        resolve(cityName)
      })
      .catch((error) => reject(error))
  })
}
