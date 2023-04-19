import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Community from './pages/community/Community'
import Location from './pages/location/Location'
import Search from './pages/search/Search'
import Market from './pages/market/Market'
import Service from './pages/service/Service'
import Upload from './pages/upload/Upload'
import Timeline from './pages/timeline/Timeline'
import { AnimatePresence } from 'framer-motion'

export default function Router() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/community" element={<Community />} />
        <Route path="/location" element={<Location />} />
        <Route path="/market" element={<Market />} />
        <Route path="/service/:id" element={<Service />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </AnimatePresence>
  )
}
