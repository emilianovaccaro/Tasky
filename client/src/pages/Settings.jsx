import React, { useState } from 'react'
import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { Content } from '../components/Content'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import ChangePassForm from '../components/ChangePassForm'
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
    values === 'sunset' && (document.body.style.backgroundImage = `url(${Sunset})`)
    values === 'forest' && (document.body.style.backgroundImage = `url(${Forest})`)
    values === 'mountain' && (document.body.style.backgroundImage = `url(${Mountain}`)
  }

  const [openCloseModal, setOpenCloseModal] = useState(false)

  return (
    <>
      <Content>
        { openCloseModal && <ChangePassForm toggleModal={setOpenCloseModal}/>}
        <Title>Configuración</Title>

        <TextButtonSmall onClick={() => setOpenCloseModal(!openCloseModal)}>Cambiar contraseña</TextButtonSmall>

        <Label>Cambiar tema de la aplicación</Label>
        <SettingsContainer>
          <ColorCard dark onClick={() => {handleTheme(theme.dark, 'dark')}}>Noche</ColorCard>
          <ColorCard intermediate onClick={() => {handleTheme(theme.intermediate, 'intermediate')}}>Bosque</ColorCard>
          <ColorCard light onClick={() => {handleTheme(theme.light, 'light')}}>Agua</ColorCard>
        </SettingsContainer>

        <Label>Cambiar imagen de fondo</Label>
        <SettingsContainer>
          <img onClick={() => {handleBackground('sunset')}} src={SunsetThumb} alt='background' />
          <img onClick={() => {handleBackground('forest')}} src={ForestThumb} alt='background' />
          <img onClick={() => {handleBackground('mountain')}} src={MountainThumb} alt='background' />
        </SettingsContainer>
      </Content>
    </>
  )
}

const SettingsContainer = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;

  img {
    width: 130px;
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
  width: 130px;
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  cursor: pointer;
  transition: .2s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => p.theme.styles.colors.white};
  font-size: ${p => p.theme.styles.fontSize.extraSmall};

  background: ${p => p.dark && 'linear-gradient(90deg, #6C757D, #495057, #343A40)'};
  background: ${p => p.light && 'linear-gradient(90deg, #768EAA, #6793D1, #4C7A99)'};
  background: ${p => p.intermediate && 'linear-gradient(90deg, #72BE6F, #69A773, #41A15E)'};

  &:hover {
    transform: scale(1.05);
  }

`