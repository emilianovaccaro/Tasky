import React from 'react'
import styled from 'styled-components'
import { Profile } from './Profile'
import { TextButtonSmall } from './Button/TextButtonSmall'
import { Icon, icons } from './Icon'

export const Sidebar = (  ) => {
  return(
    <SideBarContainer>
      <img src={'../src/assets/logo-banner.svg'} alt={'Tasky logo'} className='logo' />
      <hr />
      <NavLinks>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#' active>
            <Icon as={icons.task} size={20} mr={8} />
            Tareas
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.trash} size={20} mr={8} />
            Papelera
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.team} size={20} mr={8} />
            Mi equipo
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.settings} size={20} mr={8} />
            Configuración
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.logOut} size={20} mr={8} />
            Cerrar sesión
          </TextButtonSmall>
        </li>
      </NavLinks>
      <ProfileContainer>
        <Profile imageSize={32} labelText='Nombre Apellido' subLabelText='EquipoID'/>
      </ProfileContainer>
      
    </SideBarContainer>
  )
}

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 32px 0;

`

const SideBarContainer = styled.nav`
  height: 100vh;
  width: 200px;
  position: fixed;
  padding: 0 24px;
  z-index: 999;
  background-color: ${({theme}) => theme.mode.secondary};
  display: flex;
  flex-direction: column;

  .logo {
    width: 60%;
    margin: 48px auto 16px auto;
  }

  hr {
    width: 100%;
    opacity: .5;
  }

`

const ProfileContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 48px);
  margin-left: -24px;
  padding: 24px;
  background-color: ${({theme}) => theme.mode.primary};
`