import React from 'react'
import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { Content } from '../components/Content'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import useTheme from '../hooks/useTheme'
import { theme } from '../app/theme'
import styled from 'styled-components'

export const Settings = () => {
  const { setActualTheme } = useTheme()

  const handleTheme = (values) => {
    localStorage.setItem('theme', values)
    window.location.reload()
    return setActualTheme(values)
  }

  const handleBackground = (values) => {
    localStorage.setItem('background', values)
    window.location.reload()
    return setActualTheme(values)
  }

  return (
    <>
      <Content>
        <Title>Configuración</Title>

        <Label>Cambiar tema de la aplicación</Label>
        <SettingsContainer>
          <ColorCard dark onClick={() => {handleTheme('dark')}} />
          <ColorCard light onClick={() => {handleTheme('light')}} />
          <ColorCard intermediate onClick={() => {handleTheme('intermediate')}} />
        </SettingsContainer>

        <Label>Cambiar imagen de fondo</Label>
        <SettingsContainer>
          <img onClick={() => {handleBackground('dark')}} src={'../src/assets/background-forest.jpg'} alt='background' />
          <img onClick={() => {handleBackground('dark')}}src={'../src/assets/background-sunset.jpg'} alt='background' />
          <img onClick={() => {handleBackground('dark')}} src={'../src/assets/background-stars.jpg'} alt='background' />
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