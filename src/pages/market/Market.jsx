import { Input, LoadingOverlay, Select } from '@mantine/core'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import Filter from '../../components/Filter'
import TallCard from '../../components/TallCard'
import styles from './market.module.scss'
import { motion } from 'framer-motion'
import { useDisclosure } from '@mantine/hooks'

export default function Market() {
  const [visible, { toggle }] = useDisclosure(true)
  const [searchValue, setSearchValue] = useState('')

  const [filterElements, _setFilterElements] = useState([
    'Art',
    'Handmade',
    'Collectibles'
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
        // console.log(error)
      }
      toggle()
    }
    takeLocation()
  }, [])

  return (
    <motion.div
      className={styles.market}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {visible && (
        <div className={styles.loader}>
          <LoadingOverlay visible={visible} overlayBlur={2} />
        </div>
      )}
      <h1 className={styles.heading}>Market</h1>

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
          <h4 className={styles.city}>{userCity ? userCity : null}Kandy</h4>
          <MapPin size={16} weight="fill" />
          <div className={styles.distance}>2.5km</div>
        </div>
      </div>

      <div className={styles.content}>
        <TallCard
          img="https://images.pexels.com/photos/6243342/pexels-photo-6243342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Rs. 10000"
          subtitle="Hand Painted Items"></TallCard>

        <TallCard
          img="https://images.unsplash.com/photo-1523367438061-01c055ce790c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
          title="Rs. 8000"
          subtitle="Hand Painted Pots"></TallCard>

        <TallCard
          img="https://images.pexels.com/photos/4610857/pexels-photo-4610857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Rs. 12500"
          subtitle="Bathik cloths"></TallCard>

        <TallCard
          img="https://images.pexels.com/photos/6769966/pexels-photo-6769966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Rs. 5000"
          subtitle="Local items"></TallCard>
      </div>
    </motion.div>
  )
}
