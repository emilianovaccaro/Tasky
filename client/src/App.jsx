import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import { Tasks } from './pages/Tasks'
import { MyTeam } from './pages/MyTeam'
import { Settings } from './pages/Settings'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Error404 } from './pages/Error404'
import { Components } from './pages/Components'
import ProtectRoute from './helpers/ProtectRoute'
import { styles } from './app/theme'
import ProtectSidebar from './helpers/ProtectSidebar'
import RedirectLogin from './helpers/RedirectLogin'
import { currentTheme } from './helpers/currentTheme'
import Forest from './assets/background-forest.jpg'
import Sunset from './assets/background-sunset.jpg'
import Mountain from './assets/background-mountain.jpg'
 
function App() {
  const [mode, setMode] = useState({})
  
  useEffect(()=> {
    setMode(currentTheme(localStorage.getItem('theme')))
    const background = localStorage.getItem('background')
    background === 'forest' && (document.body.style.backgroundImage = Forest)
    background === 'sunset' && (document.body.style.backgroundImage = Sunset)
    background === 'mountain' && (document.body.style.backgroundImage = Mountain)
  },[])

  return (
    <ThemeProvider theme={{ mode, styles }}>
      <ProtectSidebar/>
      <Routes>
        <Route path="/" element={<ProtectRoute> <Tasks /> </ProtectRoute>} />
        <Route path="/assigned" element={<ProtectRoute> <Tasks section={'assigned'} /> </ProtectRoute>} />
        <Route path="/trash" element={<ProtectRoute> <Tasks section={'trash'} /> </ProtectRoute>} />
        <Route path="/my-team" element={<ProtectRoute> <MyTeam /> </ProtectRoute>} />
        <Route path="/settings" element={<ProtectRoute> <Settings setMode={setMode}/> </ProtectRoute>} />
        <Route path="/login" element={<RedirectLogin><Login /></RedirectLogin>} />
        <Route path="/register" element={<RedirectLogin> <Register /> </RedirectLogin>} />
        <Route path="/components" element={<ProtectRoute> <Components /> </ProtectRoute>} />
        <Route path="*" element={<ProtectRoute> <Error404 /> </ProtectRoute>} />
      </Routes>
    </ThemeProvider>
  )
}
export default App