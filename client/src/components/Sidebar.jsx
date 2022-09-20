import { React, useState } from 'react'
import styled from 'styled-components'
import { Profile } from './Profile'
import { TextButtonSmall } from './Button/TextButtonSmall'
import { IconButton } from './Button/IconButton'
import { Icon, icons } from './Icon'

export const Sidebar = () => {

  const [openSidebar, setOpenSidebar] = useState(false)

  return(
    <SidebarContainer openSidebar={openSidebar}>
      <SidebarTopContainer>
        <img src={'../src/assets/logo-banner.svg'} alt={'Tasky logo'} className='logo' />
        <hr />
        <IconButton className='hamburgerMenu' onClick={() => setOpenSidebar(openSidebar => !openSidebar)}><Icon as={icons.hamburgerMenu} white={'white'} /></IconButton>
      </SidebarTopContainer>
      <NavLinks openSidebar={openSidebar}>
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
      <ProfileContainer openSidebar={openSidebar}>
        <Profile imageSize={32} labelText='Nombre Apellido' subLabelText='EquipoID'/>
      </ProfileContainer>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.nav`
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
  
  .hamburgerMenu {display: none;}

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    height: ${p => p.openSidebar ? '100vh' : '64px'};
    width: calc(100% - 48px);

    .logo {
      width: unset;
      height: 24px;
      margin: 20px 0;
    }
    
    hr {display: none;}
    .hamburgerMenu {display: block;}
  }
`

const SidebarTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 32px 0;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    display: ${p => p.openSidebar ? 'flex' : 'none'};
  }

`

const ProfileContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 48px);
  margin-left: -24px;
  padding: 24px;
  background-color: ${({theme}) => theme.mode.primary};

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    display: ${p => p.openSidebar ? 'fixed' : 'none'};
    position: relative;
    background-color: transparent;
    border-top: 1px solid ${p => p.theme.styles.colors.white}80;
    margin-left: 0;
    padding-left: 0;
    padding-right: 48px;
  }

`