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
      <ul>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.task} />
            Tareas
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall noUnderline lowOpacity to='#'>
            <Icon as={icons.trash} />
            Papelera
          </TextButtonSmall>
        </li>
        <li>
        </li>
        <li>
        </li>
        <li>
        </li>
      </ul>
      <Profile imageSize={48} labelText='Nombre Apellido' subLabelText='EquipoID'/>
    </SideBarContainer>
  )
}

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

