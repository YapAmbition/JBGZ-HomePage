import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatRoom from './pages/ChatRoom'
import MdView from './pages/MdView'
import March7th from './pages/March7th'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/md-view" element={<MdView />} />
        <Route path="/march-7th" element={<March7th />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App