import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Community from './pages/community/Community'
import Location from './pages/location/Location'
import Search from './pages/search/Search'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/community" element={<Community />} />
      <Route path="/location" element={<Location />} />
    </Routes>
  )
}
