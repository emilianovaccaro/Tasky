import React from 'react'
import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { Content } from '../components/Content'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'


export const Settings = () => {
  return (
    <>
      <Content>
        <Title>Configuración</Title>

        <Label>Cambiar tema de la aplicación</Label>
        <Label>Cambiar imagen de fondo</Label>
        <TextButtonSmall>Cambiar foto de perfil</TextButtonSmall>
        <TextButtonSmall>Cambiar contraseña</TextButtonSmall>

      </Content>
    </>
  )
}