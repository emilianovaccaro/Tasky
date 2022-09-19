import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Error404 } from './pages/Error404'
import { Components } from './pages/Components'
import { theme, styles } from './app/theme'
 
function App() {
  const mode = theme.dark

  return (
    <ThemeProvider theme={{ mode, styles }}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/components" element={<Components />}/>
        <Route path="*" element={<Error404 />}/>
      </Routes>
    </ThemeProvider>
  )
}
export default App

