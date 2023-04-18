// import Post from "./components/Post";

import styles from './community.module.scss'
import { Carousel } from '@mantine/carousel'
import { Input } from '@mantine/core'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Post from './components/Post'
import User from './components/User'
import Question from './components/Question'
import { useEffect, useState } from 'react'
import { loadCommunityData } from '../../api/getCommunityData'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [postsDom, setPostsDom] = useState([])

  useEffect(() => {
    async function loadData() {
      const data = await loadCommunityData()
      console.log(data)

      const posts = []

      data.forEach((post) => {
        if (post.type === 'post') {
          posts.push(
            <div key={post.postId} className={styles.element}>
              <User
                image={post.user.image}
                name={post.user.name}
                time={post.dateAndTime}></User>
              <Post
                post={post.image}
                title={post.title}
                desc={post.description || ''}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}></Post>
            </div>
          )
        } else if (post.type === 'question') {
          posts.push(
            <div key={post.postId} className={styles.element}>
              <User
                image={post.user.image}
                name={post.user.name}
                time={post.dateAndTime}></User>
              <Question
                topAnswer={post.topAnswer}
                topAnswerUserIcon={post.answeredUser.image}
                topAnswerUserName={post.answeredUser.name}
                question={post.question}
                upvotesCount={post.upvotesCount}
                commentsCount={post.commentsCount}></Question>
            </div>
          )
        }

        setPostsDom(posts)
      })

      setPosts(data)
    }
    loadData()
  }, [])

  return (
    <div className={styles.community}>
      <h1 className={styles.heading}>Community</h1>
      {/* <div className={styles.sliders}>
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
      </div> */}
      <div className={styles.search_bar}>
        <Input
          icon={<MagnifyingGlass size={14} />}
          placeholder="Search"
          radius="xl"
          classNames={{ input: 'input_box', icon: 'input_icon' }}
        />
      </div>

      <div className={styles.social_content}>{postsDom}</div>
    </div>
  )
}
