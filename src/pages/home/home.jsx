import React from 'react'
import styles from './home.module.scss'
import { Button } from '@mantine/core'

export default function Home() {
  console.log('hello')
  let name = 'Mantine'
  return (
    <div className={styles.div}>
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        Indigo cyan
      </Button>
    </div>
  )
}
