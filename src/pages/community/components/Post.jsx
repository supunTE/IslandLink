import styles from '../community.module.scss'

export default function Post({ post, title, desc }) {
  return (
    <div className={styles.post_details}>
      <section className={styles.post_img}>
        <img src={post} alt="user avatar" />
      </section>
      <section className={styles.post_content}>
        <div className={styles.post_title}>{title}</div>
        <div className={styles.post_desc}>{desc}</div>
      </section>
    </div>
  )
}
