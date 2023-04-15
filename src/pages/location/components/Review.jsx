import styles from '../location.module.scss'

export default function User({ desc }) {
  return <div className={styles.review_desc}>{desc}</div>
}
