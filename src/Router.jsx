import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Search from './pages/search/Search'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
