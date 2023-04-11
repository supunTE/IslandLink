import styles from './home.module.scss'
import CloudyIcon from '../../assets/weather/Cloudy.svg'
import {
  Gear,
  BellRinging,
  MapPin,
  MagnifyingGlass
} from '@phosphor-icons/react'
import { Input } from '@mantine/core'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home_card}>
        <div className={styles.weather_card}>
          <div className={styles.top_bar}>
            <div className={styles.user}>
              <div className={styles.user_avatar}>
                <div className={styles.user_avatar_img}>
                  <img
                    src="https://images.unsplash.com/photo-1624530460643-b0aa24cc02b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="user avatar"
                  />
                </div>
                <div className={styles.settings_icon}>
                  <Gear size={20} />
                </div>
              </div>
            </div>
            <div className={styles.alert}>
              <div className={styles.alert_icon}>
                <BellRinging size={20} weight="fill" />
              </div>
              <span>Flood Alert</span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.values}>
              <div className={styles.temperature}>32°C</div>
              <div className={styles.weather}>Cloudy</div>
              <div className={styles.location}>
                <div className={styles.location_icon}></div>
              </div>
            </div>
            <div className={styles.weather_icon}>
              <img src={CloudyIcon} alt="weather icon" />
            </div>
          </div>
          <div className={styles.location_name}>
            <MapPin size={16} weight="fill" />
            <span>Colombo, Western Province</span>
          </div>
        </div>
        <div className={styles.meeting_details}>Upcoming meeting at 2PM.</div>
      </div>

      <Input
        icon={<MagnifyingGlass size={14} />}
        placeholder="Search"
        radius="xl"
        classNames={{ input: 'input_box', icon: 'input_icon' }}
      />

      <div className={styles.section}>
        <div className={styles.section_title}>For you</div>
        <div className={styles.section_content}>
          <div className={styles.section_card}>
            <div className={styles.illustration}>
              <div className={styles.img1}></div>
            </div>
            <div className={styles.section_card_title}>Wishlist</div>
          </div>

          <div className={styles.section_card}>
            <div className={styles.illustration}>
              <div className={styles.img2}></div>
            </div>
            <div className={styles.section_card_title}>History</div>
          </div>

          <div className={styles.section_card}>
            <div className={styles.illustration}>
              <div className={styles.img3}></div>
            </div>
            <div className={styles.section_card_title}>Popular</div>
          </div>

          <div className={styles.section_card}>
            <div className={styles.illustration}>
              <div className={styles.img4}></div>
            </div>
            <div className={styles.section_card_title}>Notifications</div>
          </div>
        </div>
      </div>
    </div>
  )
}
