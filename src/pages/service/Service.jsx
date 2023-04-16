import styles from './service.module.scss'
import { Carousel } from '@mantine/carousel'
import { Image, Button, LoadingOverlay, Box } from '@mantine/core'
import Review from './components/Review'
import User from './components/User'
import { Rating } from '../../components/LongCard'
import { useParams } from 'react-router-dom'
import { PlusCircle, MapTrifold, ForkKnife } from '@phosphor-icons/react'
import { loadOneService, requestLocation } from '../../api'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

export default function Service() {
  const { id } = useParams()
  const [visible, { toggle }] = useDisclosure(true)
  const [location, setLocation] = useState('')
  const [docData, setDocData] = useState(null)
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1615766467663-63d763510149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
  ])

  useEffect(() => {
    async function loadData() {
      const data = await loadOneService(id)

      if (data) {
        const imagesArray = [data.image]
        if (data.images) {
          for (const image of data.images) {
            imagesArray.push(image)
          }
        }
        setImages(imagesArray)
        setDocData(data)
        const distance = await requestLocation(
          data.location._long,
          data.location._lat
        )
        setLocation(distance)
        toggle()
      }
    }
    loadData()
  }, [id])

  const slides = images.map((url, index) => (
    <Carousel.Slide key={index} className="carousel">
      <Image src={url} />
    </Carousel.Slide>
  ))

  return (
    <div className={styles.service}>
      <div className={styles.loader}>
        <LoadingOverlay visible={visible} overlayBlur={2} />
      </div>
      <div className={styles.carousel_container}>
        <Carousel maw={320} height={200} mx="auto" withIndicators>
          {slides}
        </Carousel>
      </div>

      <div className={styles.caption_bar}>
        <div className={styles.place}>
          <section className={styles.title}>
            {docData?.name ? docData.name : ''}
          </section>
          <section className={styles.location}>{location}</section>
        </div>
        <div className={styles.icons}>
          <section>
            <ForkKnife size={20} />{' '}
          </section>
          <section>
            <MapTrifold size={20} weight="fill" />
          </section>
        </div>
      </div>

      <div className={styles.desc}>
        <Button radius="xl" className={styles.btn}>
          Book
        </Button>
      </div>

      <div className={styles.review_title}>
        <div id={styles.review_title}>Reviews</div>
        <div>
          <PlusCircle size={20} color="#02505a" weight="fill" />{' '}
        </div>
        <div id={styles.review_presentage}>3.2/5 (1200)</div>
      </div>

      <div className={styles.reviews}>
        <div className={styles.review_card}>
          <User
            image="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="Michel"></User>
          <Review desc="it was a beautiful property, In lovely quite area, just 5minutes away from the mail street.. The interiors were done beautifully and very luxurious"></Review>
          <Rating rating="2.5" rateCount="2.5" />
        </div>
        <div className={styles.review_card}>
          <User
            image="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="Michel"></User>
          <Review desc="it was a beautiful property, In lovely quite area, just 5minutes away from the mail street.. The interiors were done beautifully and very luxurious"></Review>
          <Rating rating="2.5" rateCount="2.5" />
        </div>
        <div className={styles.review_card}>
          <User
            image="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="Michel"></User>
          <Review desc="it was a beautiful property, In lovely quite area, just 5minutes away from the mail street.. The interiors were done beautifully and very luxurious"></Review>
          <Rating rating="2.5" rateCount="2.5" />
        </div>
      </div>
    </div>
  )
}
