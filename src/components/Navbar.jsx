import * as PhosphorIcons from '@phosphor-icons/react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './navbar.module.scss'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navElements = [
    { name: 'Home', link: '/', icon: PhosphorIcons.House },
    { name: 'Search', link: '/search', icon: PhosphorIcons.MagnifyingGlass },
    { name: 'Community', link: '/community', icon: PhosphorIcons.PlusCircle },
    { name: 'Marketplace', link: '/market', icon: PhosphorIcons.Storefront },
    { name: 'Timeline', link: '/timeline', icon: PhosphorIcons.Calendar }
  ]

  const [activeElement, setActiveElement] = useState('Home')

  const location = useLocation()
  useEffect(() => {
    navElements.forEach((element) => {
      if (location.pathname === element.link) {
        setActiveElement(element.name)
      }
    })
  }, [location])

  return (
    <div className={styles.navbar}>
      <nav>
        <ul>
          {navElements.map((element, index) => (
            <li key={index}>
              <NavLink
                to={element.link}
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? styles.active : ''
                }>
                {element.name === activeElement ? (
                  <element.icon size={32} weight="fill" />
                ) : (
                  <element.icon size={32} />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
