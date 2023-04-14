import styles from '../community.module.scss'

export default function User({ image, name, time }) {
  return (
    <div className={styles.user_details}>
      <section className={styles.user_img}>
        <img src={image} alt="user avatar" />
      </section>
      <section>
        <div className={styles.name}>{name}</div>
        <div className={styles.time}>{time}</div>
      </section>
    </div>
  )
}
