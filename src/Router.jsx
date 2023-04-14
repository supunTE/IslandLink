import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Community from './pages/community/Community'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  )
}
