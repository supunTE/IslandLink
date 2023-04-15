import styles from './filter.module.scss'
import { Funnel } from '@phosphor-icons/react'
import cs from 'classnames'
import { useState } from 'react'

export default function Filter({ elements }) {
  const [selected, setSelected] = useState(elements)

  const filterHandler = (element) => {
    if (selected.includes(element)) {
      setSelected(selected.filter((item) => item !== element))
    } else {
      setSelected([...selected, element])
    }
  }

  return (
    <div className={styles.filter}>
      <div className={styles.items}>
        <div className={styles.icon}>
          <Funnel size={20} weight="fill" />
        </div>
        <div className={styles.filters}>
          {elements.map((element) => (
            <div
              className={cs(styles.item, {
                [styles.selected]: selected.includes(element)
              })}
              onClick={() => filterHandler(element)}
              key={element}>
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
