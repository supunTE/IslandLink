import styles from './post.module.scss'
import { useEffect, useRef } from 'react'
import LikeBar from './LikeBar'

export default function Post({ post, title, desc, likesCount, commentsCount }) {
  const imageRef = useRef(null)
  useEffect(() => {
    const image = imageRef.current
    image.addEventListener('load', () => {
      const { naturalWidth, naturalHeight } = image
      if (naturalWidth > naturalHeight) {
        image.classList.add(styles.img_wide)
      } else {
        image.classList.add(styles.img_tall)
      }
    })
  }, [])

  return (
    <div className={styles.post_details}>
      <section className={styles.post_img}>
        <img src={post} alt="user avatar" ref={imageRef} />
      </section>
      <LikeBar likes={likesCount} comments={commentsCount}></LikeBar>
      <section className={styles.post_content}>
        <div className={styles.post_title}>{title}</div>
        {desc && <div className={styles.post_desc}>{desc}</div>}
      </section>
    </div>
  )
}
