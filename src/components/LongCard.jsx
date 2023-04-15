import styles from './long-card.module.scss'
import * as PhosphorIcons from '@phosphor-icons/react'

export default function LongCard({
  img,
  title,
  subtitle,
  label,
  facilityList = [],
  rating = 0,
  rateCount = 0
}) {
  return (
    <div className={styles.longCard}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${img})` }}></div>
      <div className={styles.text_content}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <span className={styles.label}>{label}</span>
        <div className={styles.facilities}>
          {facilityList.map((facility, index) => (
            <FacilityIcon key={index} facility={facility} />
          ))}
        </div>
        <Rating rating={rating} rateCount={rateCount} />
      </div>
    </div>
  )
}

export function FacilityIcon({ facility }) {
  const icons = {
    wifi: PhosphorIcons.WifiHigh,
    food: PhosphorIcons.ForkKnife,
    charge: PhosphorIcons.BatteryCharging,
    health: PhosphorIcons.FirstAid,
    ac: PhosphorIcons.ThermometerCold,
    bed: PhosphorIcons.Bed,
    gym: PhosphorIcons.Barbell,
    bicycle: PhosphorIcons.Bicycle,
    camp: PhosphorIcons.Tent,
    play: PhosphorIcons.Volleyball,
    pet: PhosphorIcons.Dog
  }

  const Icon = icons[facility]

  return (
    <div className={styles.facility_icon}>
      <Icon size={16} />
    </div>
  )
}

function roundToHalf(value) {
  const integerPart = Math.floor(value)
  const decimal = value % 1
  const roundedDecimal = Math.round(decimal * 2) / 2
  const result = [integerPart, roundedDecimal]
  if (roundedDecimal === 1) {
    result[0]++
    result[1] = 0
  }
  return result
}

export function Rating({ rating, rateCount }) {
  const { StarHalf, Star } = PhosphorIcons
  const elements = []

  const [integer, decimal] = roundToHalf(rating)

  for (let i = 1; i <= 5; i++) {
    if (i <= integer) {
      elements.push(<Star size={16} key={i} weight="fill" />)
      continue
    }
    if (decimal === 0.5 && i === integer + 1) {
      elements.push(<StarHalf size={16} key={i} weight="fill" />)
      continue
    }
    elements.push(<Star size={16} key={i} />)
  }

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>{elements}</div>
      <span className={styles.rate_count}>({rateCount})</span>
    </div>
  )
}
