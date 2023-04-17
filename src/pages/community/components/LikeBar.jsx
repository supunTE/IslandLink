import styles from './likebar.module.scss'
import { Heart, ArrowFatUp, ChatTeardrop, Link } from '@phosphor-icons/react'

export default function LikeBar({ likes, comments, upVoteEnabled = false }) {
  return (
    <div className={styles.like_bar}>
      <div className={styles.like}>
        {upVoteEnabled ? <ArrowFatUp size={20} /> : <Heart size={20} />}
        <div className={styles.like_count}>{likes}</div>
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
