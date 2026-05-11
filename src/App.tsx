import { AnimatePresence, motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'

import UpdateDetailPage from './pages/UpdateDetailPage'
import UpdatesIndexPage from './pages/UpdatesIndexPage'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        initial={{ opacity: 0, y: 12 }}
        key={location.pathname}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path='/' element={<UpdatesIndexPage />} />
          <Route path='/updates' element={<UpdatesIndexPage />} />
          <Route path='/updates/:slug' element={<UpdateDetailPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default App
