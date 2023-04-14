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

export default function Search() {
  const [filterElements, _setFilterElements] = useState([
    'Locations',
    'Hotels',
    'Co-working-space'
  ])

  const [userCity, setUserCity] = useState('')
  const [services, setServices] = useState({})
  const [serviceIds, setServiceIds] = useState([])
  const [searchResultCards, setSearchResultCards] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const userCords = await getCords()
        const userLocation = await getUserLocation(userCords[0], userCords[1])
        setUserCity(userLocation)
      } catch (error) {
        console.log(error)
      }

      const servicesCollection = collection(db, 'services')
      const q = query(servicesCollection, limit(50))
      const docs = await getDocs(q)

      // const userLocation = await getLocation()

      const cards = []
      docs.forEach((doc) => {
        const data = doc.data()
        // const distance = requestDistance(userLocation, data.location)
        // console.log(distance)
        // const serviceLocation = [data.location._lat, data.location._long]
        // const distance = requestDistance(userLocation, [56.12, 10.25])
        // console.log(distance)

        cards.push(
          <TallCard
            key={doc.id}
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

      // requestDistance
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
      <div className={styles.content}>{searchResultCards}</div>
    </div>
  )
}
