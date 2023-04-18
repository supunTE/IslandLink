import styles from './likebar.module.scss'
import { Heart, ArrowFatUp, ChatTeardrop, Link } from '@phosphor-icons/react'
import { useState } from 'react'

export default function LikeBar({ likes, comments, upVoteEnabled = false }) {
  const [liked, setLiked] = useState(false)

  const like = () => {
    setLiked(!liked)
  }

  return (
    <div className={styles.like_bar}>
      <div className={styles.like} onClick={like}>
        {upVoteEnabled ? (
          <ArrowFatUp
            size={20}
            weight={liked ? 'fill' : 'regular'}
            className={liked ? styles.liked : ''}
          />
        ) : (
          <Heart
            size={20}
            weight={liked ? 'fill' : 'regular'}
            className={liked ? styles.liked : ''}
          />
        )}
        <div className={styles.like_count}>{liked ? likes + 1 : likes}</div>
      </div>
      <div className={styles.comment}>
        <ChatTeardrop size={20} />
        <div className={styles.comment_count}>{comments}</div>
      </div>
      <div className={styles.share}>
        <Link size={20} />
      </div>
    </div>
  )
}
