import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Home } from './pages/Home'
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
import { useSelector } from 'react-redux'
 
function App() {
  const [mode, setMode] = useState({})
  
  const token = localStorage.getItem('token')
  const { isSignedIn } = useSelector(state => state.user)
  
  useEffect(()=> {
    setMode(currentTheme(localStorage.getItem('theme')))
    const background = localStorage.getItem('background') || 'sunset'
    background === 'sunset' && (document.body.style.backgroundImage = `url(${Sunset})`)
    background === 'forest' && (document.body.style.backgroundImage = `url(${Forest})`)
    background === 'mountain' && (document.body.style.backgroundImage = `url(${Mountain}`)
  },[])

  return (
    <>
      <ThemeProvider theme={{ mode, styles }}>
        <ProtectSidebar/>
        <Routes>
          <Route path="/" element={ token && isSignedIn ?  <Tasks/> : <Home/> } />
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
      <ToastContainer />
    </>
  )
}
export default App