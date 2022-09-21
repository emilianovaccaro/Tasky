import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import { Tasks } from './pages/Tasks'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Error404 } from './pages/Error404'
import { Components } from './pages/Components'
import ProtectRoute from './helpers/ProtectRoute'
import { theme, styles } from './app/theme'
import ProtectSidebar from './helpers/ProtectSidebar'
 
function App() {
  const mode = theme.dark

  return (
    <ThemeProvider theme={{ mode, styles }}>
      <ProtectSidebar/>

      <Routes>
        <Route path="/" element={<ProtectRoute> <Tasks /> </ProtectRoute>} />
        <Route path="/assigned" element={<ProtectRoute> <Tasks section={'assigned'} /> </ProtectRoute>} />
        <Route path="/trash" element={<ProtectRoute> <Tasks section={'trash'} /> </ProtectRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/components" element={<ProtectRoute> <Components /> </ProtectRoute>} />
        <Route path="*" element={<ProtectRoute> <Error404 /> </ProtectRoute>} />
      </Routes>
    </ThemeProvider>
  )
}
export default App