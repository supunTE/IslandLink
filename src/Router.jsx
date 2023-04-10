import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Market from './pages/market/Market'
import Settings from './pages/settings/Settings'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/market" element={<Market />} />
    </Routes>
  )
}
