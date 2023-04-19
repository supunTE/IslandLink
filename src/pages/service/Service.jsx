import styles from './service.module.scss'
import { Carousel } from '@mantine/carousel'
import { Image, Button, LoadingOverlay, Box, ActionIcon } from '@mantine/core'
import Review from './components/Review'
import User from './components/User'
import { Rating } from '../../components/LongCard'
import { useParams } from 'react-router-dom'
import { PlusCircle, MapTrifold, ForkKnife } from '@phosphor-icons/react'
import { getComments, loadOneService, requestLocation } from '../../api'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Service() {
  const { id } = useParams()
  const [visible, { toggle }] = useDisclosure(true)
  const [location, setLocation] = useState('')
  const [docData, setDocData] = useState(null)
  const [comments, setComments] = useState([])
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1615766467663-63d763510149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
  ])
  const [googleMapURL, setGoogleMapURL] = useState('#')

  useEffect(() => {
    async function loadData() {
      const data = await loadOneService(id)
      const commentsArr = await getComments(id)
      if (data) {
        const imagesArray = [data.image]
        if (data.images) {
          for (const image of data.images) {
            imagesArray.push(image)
          }
        }
        setImages(imagesArray)
        setDocData(data)
        setGoogleMapURL(
          `https://www.google.com/maps/search/?api=1&query=${data.location._lat},${data.location._long}`
        )
        const distance = await requestLocation(
          data.location._long,
          data.location._lat
        )
        if (distance) {
          setLocation(distance)
        } else {
          setLocation('Not found')
        }
        toggle()
      }

      const commentCards = []
      commentsArr.forEach((comment, index) => {
        commentCards.push(
          <div className={styles.review_card} key={index}>
            <User image={comment.profileImg} name={comment.userName}></User>
            <Review desc={comment.userComment}></Review>
            <Rating rating={comment.userRating} />
          </div>
        )
      })
      setComments(commentCards)
    }
    loadData()
  }, [])

  const slides = images.map((url, index) => (
    <Carousel.Slide key={index} className="carousel">
      <Image src={url} />
    </Carousel.Slide>
  ))

  return (
    <motion.div
      className={styles.service}
      transition={{ type: 'tween', duration: 0.2 }}
      initial={{ x: '120vw' }}
      animate={{ x: 0 }}
      exit={{ x: '120vw' }}>
      {visible && (
        <div className={styles.loader}>
          <LoadingOverlay visible={visible} overlayBlur={2} />
        </div>
      )}
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
          <ActionIcon size="xl" radius="lg" variant="filled">
            <ForkKnife size={20} />
          </ActionIcon>
          <a href={googleMapURL} target="_blank" rel="noreferrer">
            <ActionIcon size="xl" radius="lg" variant="filled">
              <MapTrifold size={20} weight="fill" />
            </ActionIcon>
          </a>
        </div>
      </div>

      <a
        className={styles.desc}
        href="https://m.uber.com/ul/"
        target="_blank"
        rel="noreferrer">
        <Button radius="xl" color="dark" className="btn">
          Uber Ride
        </Button>
      </a>

      <div className={styles.review_title}>
        <div id={styles.review_title}>Reviews</div>
        <div id={styles.review_presentage}>
          {docData?.rating || 0}/5 ({docData?.reviews || 0})
        </div>
        <PlusCircle size={20} weight="fill" className={styles.add_icon} />
      </div>

      <div className={styles.reviews}>{comments}</div>
    </motion.div>
  )
}
