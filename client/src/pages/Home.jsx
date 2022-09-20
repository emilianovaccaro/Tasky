import React from 'react'
import { Label } from '../components/text/Label'
import { Sidebar } from '../components/sidebar'

export const Home = () => {
  // TODO: Queda por hacer el responsive del menu
  // TODO: Al terminar eliminar pages/Component.jsx y también su ruta en App.jsx
  // TODO: Al terminar también hacer framer motion, olvidé mi contraseña, landing page
  return (
    <>
      <Sidebar/>
      <Label>Home</Label>
    </>
  )
}