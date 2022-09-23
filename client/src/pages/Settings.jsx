import React from 'react'
import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { Content } from '../components/Content'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import Forest from '../assets/background-forest.jpg'
import Sunset from '../assets/background-sunset.jpg'
import Mountain from '../assets/background-mountain.jpg'
import ForestThumb from '../assets/background-forest-thumb.jpg'
import SunsetThumb from '../assets/background-sunset-thumb.jpg'
import MountainThumb from '../assets/background-mountain-thumb.jpg'

import { theme } from '../app/theme'
import styled from 'styled-components'

export const Settings = ({setMode}) => {

  const handleTheme = (values, theme) => {
    localStorage.setItem('theme', theme)
    setMode(values)
  }

  const handleBackground = (values) => {
    localStorage.setItem('background', values)
    values === 'forest' && (document.body.style.backgroundImage = Forest)
    values === 'sunset' && (document.body.style.backgroundImage = Sunset)
    values === 'mountain' && (document.body.style.backgroundImage = Mountain)
  }

  return (
    <>
      <Content>
        <Title>Configuración</Title>

        <Label>Cambiar tema de la aplicación</Label>
        <SettingsContainer>
          <ColorCard dark onClick={() => {handleTheme(theme.dark, 'dark')}} />
          <ColorCard light onClick={() => {handleTheme(theme.light, 'light')}} />
          <ColorCard intermediate onClick={() => {handleTheme(theme.intermediate, 'intermediate')}} />
        </SettingsContainer>

        <Label>Cambiar imagen de fondo</Label>
        <SettingsContainer>
          <img onClick={() => {handleBackground('forest')}} src={ForestThumb} alt='background' />
          <img onClick={() => {handleBackground('sunset')}} src={SunsetThumb} alt='background' />
          <img onClick={() => {handleBackground('mountain')}} src={MountainThumb} alt='background' />
        </SettingsContainer>

        <TextButtonSmall>Cambiar foto de perfil</TextButtonSmall>
        <TextButtonSmall>Cambiar contraseña</TextButtonSmall>

      </Content>
    </>
  )
}

const SettingsContainer = styled.div`
  display: flex;
  gap: 32px;

  img {
    width: 120px;
    height: 90px;
    border-radius: ${p => p.theme.styles.borderRadius.medium};
    cursor: pointer;
    transition: .2s;
    
    &:hover {
      transform: scale(1.05);
    }
  }

`

const ColorCard = styled.div`
  height: 90px;
  width: 40px;
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  cursor: pointer;
  transition: .2s;

  border-left: 40px solid;
  border-right: 40px solid;

  border-left-color: ${p => p.dark && theme.dark.tertiary};
  border-left-color: ${p => p.light && theme.light.tertiary};
  border-left-color: ${p => p.intermediate && theme.intermediate.tertiary};

  border-right-color: ${p => p.dark && theme.dark.primary};
  border-right-color: ${p => p.light && theme.light.primary};
  border-right-color: ${p => p.intermediate && theme.intermediate.primary};
  
  background-color: ${p => p.dark && theme.dark.alternative};
  background-color: ${p => p.light && theme.light.alternative};
  background-color: ${p => p.intermediate && theme.intermediate.alternative};

  &:hover {
    transform: scale(1.05);
  }

`