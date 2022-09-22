import React from 'react'
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
import { theme, styles } from './app/theme'
import ProtectSidebar from './helpers/ProtectSidebar'
import RedirectLogin from './helpers/RedirectLogin'
 
function App() {
  const mode = theme.dark

  return (
    <ThemeProvider theme={{ mode, styles }}>
      <ProtectSidebar/>

      <Routes>
        <Route path="/" element={<ProtectRoute> <Tasks /> </ProtectRoute>} />
        <Route path="/assigned" element={<ProtectRoute> <Tasks section={'assigned'} /> </ProtectRoute>} />
        <Route path="/trash" element={<ProtectRoute> <Tasks section={'trash'} /> </ProtectRoute>} />
        <Route path="/my-team" element={<ProtectRoute> <MyTeam /> </ProtectRoute>} />
        <Route path="/settings" element={<ProtectRoute> <Settings /> </ProtectRoute>} />
        <Route path="/login" element={<RedirectLogin><Login /></RedirectLogin>} />
        <Route path="/register" element={<RedirectLogin> <Register /> </RedirectLogin>} />
        <Route path="/components" element={<ProtectRoute> <Components /> </ProtectRoute>} />
        <Route path="*" element={<ProtectRoute> <Error404 /> </ProtectRoute>} />
      </Routes>
    </ThemeProvider>
  )
}
export default App