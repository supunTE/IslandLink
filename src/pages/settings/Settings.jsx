import styles from './settings.module.scss'
import { Button } from '@mantine/core'
import {
  Eyeglasses,
  Translate,
  Moon,
  Envelope,
  Password,
  LockOpen,
  At,
  Phone,
  MonitorPlay,
  List,
  SpeakerSimpleX,
  FileText,
  LockKey
} from '@phosphor-icons/react'

export default function Settings() {
  return (
    <div>
      <div className={styles.settings_card}>
        <section className={styles.label_set}>
          <img
            src="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="user avatar"
          />
          <div className={styles.user_name}>Allie Grater</div>
          <div className={styles.user_id}>#123567</div>
        </section>
        <section className={styles.button_set}>
          <Button
            className={styles.card_button}
            id={styles.btn_edit}
            radius="xl">
            Edit profile
          </Button>
          <Button
            className={styles.card_button}
            id={styles.btn_signout}
            radius="xl">
            Signout
          </Button>
        </section>
      </div>

      <div className={styles.ui_heading}>
        <div className={styles.settings_heading}>Settings</div>
      </div>

      <div className={styles.ui_content}>
        <section className={styles.catogary}>General</section>
        <section>
          <div className={styles.content}>
            <Eyeglasses size={20} />
            Accessability
          </div>
          <div className={styles.content}>
            <Translate size={20} />
            Language and region
          </div>
          <div className={styles.content}>
            <Moon size={20} />
            Dark Mode
          </div>
          <div className={styles.content}>
            <Envelope size={20} />
            Manage email preferences
          </div>
        </section>

        <section className={styles.catogary}>Privacy and Security</section>
        <section>
          <div className={styles.content}>
            <Password size={20} />
            Change password
          </div>
          <div className={styles.content}>
            <LockOpen size={20} />
            2-step verification
          </div>
          <div className={styles.content}>
            <At size={20} />
            Recovery email
          </div>
          <div className={styles.content}>
            <Phone size={20} />
            Recovery phone
          </div>
          <div className={styles.content}>
            <MonitorPlay size={20} />
            Personalize ads
          </div>
          <div className={styles.content}>
            <List size={20} />
            Unlisted places
          </div>
        </section>

        <section className={styles.catogary}>Notifications</section>
        <section>
          <div className={styles.content}>
            <SpeakerSimpleX size={20} />
            Mute notifications
          </div>
        </section>

        <section className={styles.catogary}>About</section>
        <section>
          <div className={styles.content}>
            <FileText size={20} />
            Terms of use
          </div>
          <div className={styles.content}>
            <LockKey size={20} />
            Privacy policy
          </div>
        </section>
      </div>
    </div>
  )
}
