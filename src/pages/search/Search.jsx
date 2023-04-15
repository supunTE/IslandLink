import { Input, Select } from '@mantine/core'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Filter from '../../components/Filter'
import TallCard from '../../components/TallCard'
import { db } from '../../firebase'
import { getCords } from './api/getUserCords'
import { getUserLocation } from './api/getUserLocation'
import styles from './search.module.scss'
import LongCard from '../../components/LongCard'

export default function Search() {
  const [searchValue, setSearchValue] = useState('')

  const [filterElements, _setFilterElements] = useState([
    'Locations',
    'Hotels',
    'Co-working-space',
    'Restaurants'
  ])

  const [userCity, setUserCity] = useState('')
  const [services, setServices] = useState({})
  const [serviceIds, setServiceIds] = useState([])
  const [searchResultCards, setSearchResultCards] = useState([])

  useEffect(() => {
    async function takeLocation() {
      try {
        const userCords = await getCords()
        const userLocation = await getUserLocation(userCords[0], userCords[1])
        setUserCity(userLocation)
      } catch (error) {
        console.log(error)
      }
    }
    takeLocation()
  }, [])

  // const distance = requestDistance(userLocation, data.location)
  // console.log(distance)
  // const serviceLocation = [data.location._lat, data.location._long]
  // const distance = requestDistance(userLocation, [56.12, 10.25])
  // console.log(distance)

  useEffect(() => {
    async function fetchData() {
      const servicesCollection = collection(db, 'services')
      const q = query(servicesCollection, limit(50))
      const docs = await getDocs(q)

      const cards = []
      docs.forEach((doc) => {
        const data = doc.data()
        cards.push(
          <TallCard
            key={doc.id}
            dataType={data.type}
            img={data.image}
            title={data.name}
            subtitle={`Rs. ${data.pricePerHour} per day`}
            label={`0km away`}
            facilityList={data.facilities}
            rating={data.rating}
            rateCount={data.reviews}
          />
        )
      })
      setSearchResultCards(cards)
    }
    fetchData()
  }, [])

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

      <Filter elements={filterElements}></Filter>

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
        />
        <div className={styles.details}>
          <h4 className={styles.city}>{userCity ? userCity : null}</h4>
          <MapPin size={16} weight="fill" />
          <div className={styles.distance}>2.5km</div>
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
