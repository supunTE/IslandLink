import { Input, Select, LoadingOverlay } from '@mantine/core'
import { MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { loadServicesDocs, requestLocation } from '../../api'
import Filter from '../../components/Filter'
import LongCard from '../../components/LongCard'
import TallCard from '../../components/TallCard'
import styles from './search.module.scss'
import { getDistance } from '../../api/getDistance'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDisclosure } from '@mantine/hooks'

export default function Search() {
  const [visible, { toggle }] = useDisclosure(true)

  const navigate = useNavigate()
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
  const [sortCategory, setSortCategory] = useState('')
  const [allServices, setAllServices] = useState([])
  const [services, setServices] = useState([])
  const [searchResultCards, setSearchResultCards] = useState([])

  // Update data from firebase
  useEffect(() => {
    async function loadData() {
      const city = (await requestLocation()) || ''
      setUserCity(city)
      const servs = (await loadServicesDocs()) || []
      setAllServices(servs)

      for (const [index, service] of servs.entries()) {
        const distance = await getDistance(
          service.location._long,
          service.location._lat
        )
        if (await !distance) {
          break
        }
        setAllServices((prev) => {
          const newServices = [...prev]
          newServices[index].distance = distance
          return newServices
        })
      }
      toggle()
    }
    loadData()
  }, [])

  useEffect(() => {
    setServices(allServices)
    updateCards(allServices)
  }, [allServices])

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
          onClick={() => {
            navigate(`../service/${service.id}`)
          }}
        />
      )
    }
    return cards
  }

  function generateSearchResultCards(services) {
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
        <LongCard
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
    updateCards()
  }, [searchValue])

  function updateCards(data = services) {
    if (!searchValue) {
      setSearchResultCards(generateCards(data))
    } else {
      const filteredServices = data.filter((service) =>
        service.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setSearchResultCards(generateSearchResultCards(filteredServices))
    }
  }

  function sortServices(data = services, category) {
    const newArr = [...data]
    if (category === 'price') {
      newArr.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else if (category === 'distance') {
      newArr.sort((a, b) => a.distance - b.distance)
    } else if (category === 'rating') {
      newArr.sort((a, b) => b.rating - a.rating)
    }
    return newArr
  }

  function updateCardsBaseOnFilters(fn = selectedFilterElements) {
    const values = fn.map((name) => filterValues[name])
    const filteredServices = allServices.filter((service) =>
      values.includes(service.type)
    )
    const newArr = sortServices(filteredServices, sortCategory)
    setServices(newArr)
    updateCards(newArr)
  }

  function sortChangeHandler(category) {
    setSortCategory(category)
    const newArr = sortServices(services, category)
    setServices(newArr)
    updateCards(newArr)
  }

  function filterChangeHandler(filterNames) {
    setSelectedFilterElements(filterNames)
    updateCardsBaseOnFilters(filterNames)
  }

  return (
    <motion.div
      className={styles.search}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <h1 className={styles.heading}>Search</h1>
      {visible && (
        <div className={styles.loader}>
          <LoadingOverlay
            visible={visible}
            overlayBlur={2}
            loaderProps={{ color: '#028090' }}
          />
        </div>
      )}

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

      {searchValue === '' ? (
        <div className={styles.content}>{searchResultCards}</div>
      ) : (
        <div className={styles.search_results_content}>{searchResultCards}</div>
      )}
    </motion.div>
  )
}
