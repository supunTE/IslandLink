import { Input, Select } from '@mantine/core'
import styles from './search.module.scss'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import Filter from '../../components/Filter'
import { useState, useEffect } from 'react'
import TallCard from '../../components/TallCard'
import { coworkingSpaces } from '../../data/results'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Search() {
  const [filterElements, _setFilterElements] = useState([
    'Locations',
    'Hotels',
    'Co-working-space'
  ])

  const [services, setServices] = useState({})
  const [serviceIds, setServiceIds] = useState([])
  const [searchResultCards, setSearchResultCards] = useState([])

  useEffect(() => {
    async function fetchData() {
      const servicesCollection = collection(db, 'services')
      const q = query(servicesCollection, limit(50))
      const docs = await getDocs(q)

      const cards = []
      docs.forEach((doc) => {
        const data = doc.data()
        console.log(data.facilities)
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
    }
    fetchData()
  }, [])

  console.log(services)

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
          <h4 className={styles.city}>Dambulla</h4>
          <MapPin size={16} weight="fill" />
          <div className={styles.distance}>2.5km</div>
        </div>
      </div>
      <div className={styles.content}>{searchResultCards}</div>
    </div>
  )
}
