import React from 'react'
import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { Content } from '../components/Content'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import useTheme from '../hooks/useTheme'


export const Settings = () => {
  const { setActualTheme } = useTheme()

  const handleTheme = (values) => {
    localStorage.setItem('theme', values)
    return setActualTheme(values)
  }

  return (
    <>
      <Content>
        <Title>Configuración</Title>

        <Label button onClick={() => {handleTheme('light')}}>Light</Label>
        <Label button onClick={() => {handleTheme('dark')}}>Dark</Label>
        <Label button onClick={() => {handleTheme('intermediate')}}>Intermediate</Label>

        <Label>Cambiar imagen de fondo</Label>
        <TextButtonSmall>Cambiar foto de perfil</TextButtonSmall>
        <TextButtonSmall>Cambiar contraseña</TextButtonSmall>

      </Content>
    </>
  )
}