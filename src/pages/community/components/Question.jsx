import styles from './question.module.scss'
import LikeBar from './LikeBar'

export default function Question({
  topAnswerUserIcon,
  topAnswerUserName,
  question,
  upvotesCount,
  commentsCount,
  topAnswer
}) {
  return (
    <div className={styles.post_details}>
      <section className={styles.post_bg}>
        <div className={styles.question}>
          <span>{question}</span>
          <div className={styles.question_mark}>?</div>
        </div>
      </section>
      <LikeBar
        upVoteEnabled={true}
        likes={upvotesCount}
        comments={commentsCount}></LikeBar>
      <section className={styles.top_answer}>
        <div className={styles.user}>
          <img className={styles.user_icon} src={topAnswerUserIcon}></img>
          <div className={styles.user_name}>{topAnswerUserName}</div>
        </div>
        <div className={styles.answer}>{topAnswer}</div>
      </section>
    </div>
  )
}
