// import Post from "./components/Post";

import styles from './community.module.scss'
import { Carousel } from '@mantine/carousel'
import { Input } from '@mantine/core'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Post from './components/Post'
import User from './components/User'
import Question from './components/Question'

export default function Community() {
  return (
    <div>
      <div className={styles.sliders}>
        <Carousel maw={320} mx="auto" withIndicators height={150}>
          <Carousel.Slide className={styles.slide}>
            20% Discounts for Card payments
          </Carousel.Slide>
          <Carousel.Slide className={styles.slide}>
            20% Discounts for Card payments
          </Carousel.Slide>
          <Carousel.Slide className={styles.slide}>
            20% Discounts for Card payments
          </Carousel.Slide>
        </Carousel>
      </div>

      <div className={styles.search_bar}>
        <Input
          icon={<MagnifyingGlass size={14} />}
          placeholder="Search"
          radius="xl"
          classNames={{ input: 'input_box', icon: 'input_icon' }}
        />
      </div>

      <div className={styles.social_content}>
        <div className={styles.element}>
          <User
            image="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            name="Allie Grater"
            time="12.50 pm"></User>
          <Post
            post="https://www.lovesrilanka.org/wp-content/uploads/2019/09/history-solo_1200x600.jpg"
            title='Lost in Sigiriya"s beauty! 🌴✨ #SriLanka #TravelGoals'
            desc="Sigiriya is breathtaking! From the ancient rock fortress to the stunning greenery, Sri Lanka's rich history and culture never ceases to amaze me. Can't wait to share more of my adventures with you all! 🇱🇰"
            likesCount={20}
            commentsCount={50}></Post>
        </div>

        <div className={styles.element}>
          <User
            image="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            name="Allie Grater"
            time="12.50 pm"></User>
          <Question
            topAnswer="You can take the normal bus from Colombo to Sigiriya. It's a 5 hour journey. But I recommend you to take a train 🚂. It's a 3 hour journey and you can enjoy the beautiful view of the country side."
            topAnswerUserIcon="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            topAnswerUserName="John Doe"
            question="What is the best way to get to Sigiriya from Colombo?"
            upVotescount={20}
            commentsCount={40}></Question>
        </div>

        <div className={styles.element}>
          <User
            image="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            name="Allie Grater"
            time="12.50 pm"></User>
          <Post
            post="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            title='Lost in Sigiriya"s beauty! 🌴✨ #SriLanka #TravelGoals'
            desc="Sigiriya is breathtaking! From the ancient rock fortress to the stunning greenery, Sri Lanka's rich history and culture never ceases to amaze me. Can't wait to share more of my adventures with you all! 🇱🇰"></Post>
        </div>

        <div className={styles.element}>
          <User
            image="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            name="Allie Grater"
            time="12.50 pm"></User>
          <Post
            post="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            title='Lost in Sigiriya"s beauty! 🌴✨ #SriLanka #TravelGoals'
            desc="Sigiriya is breathtaking! From the ancient rock fortress to the stunning greenery, Sri Lanka's rich history and culture never ceases to amaze me. Can't wait to share more of my adventures with you all! 🇱🇰"></Post>
        </div>
      </div>
    </div>
  )
}
