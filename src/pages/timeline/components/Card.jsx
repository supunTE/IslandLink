import styles from '../timeline.module.scss'

export default function Card({ date, desc, time }) {
  return (
    <div className={styles.dayCard}>
      <div className={styles.day}>{date}</div>

      <div className={styles.card}>
        <div className={styles.column}>
          <div>{desc}</div>
          <div>{time}</div>
        </div>
      </div>
    </div>
  )
}
