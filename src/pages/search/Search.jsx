import { Input, Select } from '@mantine/core'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Filter from '../../components/Filter'
import LongCard from '../../components/LongCard'
import TallCard from '../../components/TallCard'
import { db } from '../../firebase'
import { getCords } from './api/getUserCords'
import styles from './search.module.scss'

export default function Search() {
  const [searchValue, setSearchValue] = useState('')

  const [filterElements, _setFilterElements] = useState([
    // 'Locations',
    'Hotels',
    'Co-working space',
    'Restaurants'
  ])
  const [selectedFilterElements, setSelectedFilterElements] = useState([
    'Hotels',
    'Co-working space',
    'Restaurants'
  ])

  const filterValues = {
    Hotels: 'hotel',
    'Co-working space': 'cospace',
    Restaurants: 'restaurant'
  }

  const [userCity, setUserCity] = useState('')
  const [services, setServices] = useState([])
  const [searchResultCards, setSearchResultCards] = useState([])

  useEffect(() => {
    async function requestLocation() {
      try {
        const userCords = await getCords()
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/city`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lat: userCords[0],
              long: userCords[1]
            })
          }
        )
        const data = await response.json()
        setUserCity(data['city'])
      } catch (error) {
        console.error(error)
      }
    }
    requestLocation()
  }, [])

  useEffect(() => {
    async function getDistance(destLong, destLat) {
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
              sourceLat: userCords[0],
              sourceLong: userCords[1],
              destLong,
              destLat
            })
          }
        )

        const data = await response.json()
        return data['distance']
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchData() {
      const servicesCollection = collection(db, 'services')
      const q = query(servicesCollection, limit(10))
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
              : data.pricePerHour || 0,
          ...data,
          distance: 0
        }

        servicesData.push(serviceData)
      })

      for (const [index, service] of servicesData.entries()) {
        const distance = await getDistance(
          service.location._long,
          service.location._lat
        )
        if (!distance) {
          break
        }
        servicesData[index].distance = distance
      }

      setServices(servicesData)
    }
    fetchData()
  }, [])

  function generateCards(services) {
    const cards = []
    for (const service of services) {
      let subtitle = ''
      switch (service.type) {
        case 'hotel':
          subtitle = `Rs. ${service.pricePerHour} per day`
          break
        case 'cospace':
          subtitle = `Rs. ${service.pricePerHour} per hour`
          break
        case 'restaurant':
          subtitle = `Tap to view menu`
          break
      }
      cards.push(
        <TallCard
          key={service.id}
          dataType={service.type}
          img={service.image}
          title={service.name}
          subtitle={subtitle}
          label={`${service.distance}km away`}
          facilityList={service.facilities}
          rating={service.rating}
          rateCount={service.reviews}
        />
      )
    }
    return cards
  }

  useEffect(() => {
    setSearchResultCards(generateCards(services))
  }, [services])

  function sortChangeHandler(category) {
    if (category === 'price') {
      services.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (category === 'distance') {
      services.sort((a, b) => a.distance - b.distance)
    } else if (category === 'rating') {
      services.sort((a, b) => b.rating - a.rating)
    }
    setSearchResultCards(generateCards(services))
    updateCardsBaseOnFilters(selectedFilterElements)
  }

  function updateCardsBaseOnFilters(filterNames) {
    const values = filterNames.map((name) => filterValues[name])
    const filteredServices = services.filter((service) =>
      values.includes(service.type)
    )
    setSearchResultCards(generateCards(filteredServices))
  }

  function filterChangeHandler(filterNames) {
    setSelectedFilterElements(filterNames)
    updateCardsBaseOnFilters(filterNames)
  }

  return (
    <div className={styles.search}>
      <h1 className={styles.heading}>Search</h1>

      <Input
        icon={<MagnifyingGlass size={14} />}
        placeholder="Search"
        radius="xl"
        classNames={{ input: 'input_box', icon: 'input_icon' }}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      <Filter
        elements={filterElements}
        onChange={(value) => filterChangeHandler(value)}></Filter>

      <div className={styles.options}>
        <Select
          placeholder="Pick one"
          radius="xl"
          size="xs"
          data={[
            { value: 'distance', label: 'Distance' },
            { value: 'price', label: 'Price' },
            { value: 'rating', label: 'Rating' }
          ]}
          className={styles.select}
          classNames={{ input: 'input_select', item: 'input_dropdown_item' }}
          onChange={(data) => sortChangeHandler(data)}
        />
        <div className={styles.details}>
          <MapPin size={16} weight="fill" />
          <h4 className={styles.city}>
            {userCity ? userCity : 'Cannot Locate'}
          </h4>
          {/* <div className={styles.distance}>2.5km</div> */}
        </div>
      </div>

      {!searchValue && (
        <div className={styles.content}>{searchResultCards}</div>
      )}

      {searchValue && (
        <div className={styles.search_result}>
          {
            <LongCard
              img="https://images.unsplash.com/photo-1658387574197-74efe5041d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              title="YourSpace"
              subtitle="Rs. 1000+ per Hour"
              label="200m away"
              facilityList={['wifi', 'food']}
              rating="2.5"
              rateCount="2.5"></LongCard>
          }
        </div>
      )}
    </div>
  )
}
