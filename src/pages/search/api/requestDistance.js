const apiKey = import.meta.env.VITE_OPEN_ROUTE
const url = `https://api.openrouteservice.org/v2/matrix/driving-car?sources=0&destinations=1&api_key=${apiKey}`

export function requestDistance(source, destination) {
  const body = {
    locations: [source, destination],
    metrics: ['distance'],
    units: 'km'
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
}
