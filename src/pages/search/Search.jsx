import { Input, Select } from '@mantine/core'
import styles from './search.module.scss'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import Filter from '../../components/Filter'
import { useState } from 'react'
import TallCard from '../../components/TallCard'
import { coworkingSpaces } from '../../data/results'

export default function Search() {
  const [filterElements, _setFilterElements] = useState([
    'Locations',
    'Hotels',
    'Co-working-space'
  ])

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
      <div className={styles.content}>
        {coworkingSpaces.map((space) => (
          <TallCard
            key={space.id}
            img={space.image}
            title={space.name}
            subtitle={`Rs. ${space.pricePerHour} per day`}
            label={`${space.distance}km away`}
            facilityList={space.facilities}
            rating={space.rating}
            rateCount={space.reviews}
          />
        ))}
      </div>
    </div>
  )
}
