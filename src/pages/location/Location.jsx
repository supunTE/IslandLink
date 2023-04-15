import styles from './location.module.scss'
import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import Review from './components/Review'
import User from './components/User'
import { Rating } from '../../components/LongCard'

import { PlusCircle, MapTrifold } from '@phosphor-icons/react'

export default function Location() {
  const images = [
    'https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80',
    'https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80',
    'https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80',
    'https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80'
  ]

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ))

  return (
    <div>
      <div>
        <Carousel maw={320} mx="auto" withIndicators>
          {slides}
        </Carousel>
      </div>

      <div className={styles.caption_bar}>
        <div className={styles.place}>
          <section className={styles.title}>Sigiriya</section>
          <section className={styles.location}>
            Dambulla, Central Province
          </section>
        </div>
        <div className={styles.icons}>
          <section>
            <PlusCircle size={20} weight="fill" />
          </section>
          <section>
            <MapTrifold size={20} weight="fill" />
          </section>
        </div>
      </div>

      <div className={styles.desc}>
        Sigiriya or Sinhagiri is an ancient rock fortress located in the
        northern Matale District near the town of Dambulla in the Central
        Province, Sri Lanka. It is a site of historical and archaeological
        significance that is dominated by a massive column of granite rock
        approximately 180 m high. (Wikipedia)
      </div>

      <div className={styles.review_title}>
        <div id={styles.review_title}>Reviews</div>
        <div>
          <PlusCircle size={20} color="#02505a" weight="fill" />{' '}
        </div>
        <div id={styles.review_presentage}>3.2/5 (1200)</div>
      </div>

      <div>
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
