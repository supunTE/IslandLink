import styles from '../service.module.scss'

export default function User({ desc }) {
  return <div className={styles.review_desc}>{desc}</div>
}
