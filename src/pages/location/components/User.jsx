import styles from '../location.module.scss'

export default function User({ image, name }) {
  return (
    <div className={styles.user}>
      <div className={styles.user_img}>
        <img src={image} alt="user avatar" />
      </div>
      <div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  )
}
