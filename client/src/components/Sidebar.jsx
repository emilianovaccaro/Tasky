import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Profile } from './Profile'
import { TextButtonSmall } from './Button/TextButtonSmall'
import { IconButton } from './Button/IconButton'
import { Icon, icons } from './Icon'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, getUser, signOut } from '../redux/actions/userActions'
import { Spinner } from './Spinner'
import { Link } from 'react-router-dom'
import TaskyLogo from '../assets/logo-banner.svg'

export const Sidebar = () => {

  const [openSidebar, setOpenSidebar] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const token = localStorage.getItem('token')
  const [ loading, setLoading ] = useState(true)

  const getUserInfo = async () => {
    try {
      await dispatch(getUser(token))
      dispatch(getTeam(token))
      return setLoading(false)
    } catch(error) {
      console.log(error)
      return setLoading(true)
    }
  }

  useEffect(() => {
    getUserInfo(token)
  }, [])

  const handleClick = newPath => {
    setPath(newPath)
    setOpenSidebar(openSidebar => !openSidebar)
  }

  return(
    <SidebarContainer openSidebar={openSidebar}>
      <SidebarTopContainer>
        <Link to='/' onClick={() => handleClick('/')} style={{'textAlign': 'center'}}><img src={TaskyLogo} alt={'Tasky logo'} className='logo' /></Link>
        <hr />
        <IconButton className='hamburgerMenu' onClick={() => setOpenSidebar(openSidebar => !openSidebar)}><Icon as={icons.hamburgerMenu} white={'white'} /></IconButton>
      </SidebarTopContainer>
      <NavLinks openSidebar={openSidebar}>
        <li>
          <TextButtonSmall sidebar noUnderline lowOpacity to='/' onClick={() => handleClick('/')} active={path === '/' || path === '/assigned' || path === '/login' || path === '/register'}>
            <Icon as={icons.task} size={20} mr={8} />
            Tareas
          </TextButtonSmall>
          <ul className='innerList'>
            <TextButtonSmall sidebar noUnderline lowOpacity to='/' onClick={() => handleClick('/')} active={path === '/' || path === '/login' || path === '/register'}>
              <Icon as={icons.allTasks} size={20} mr={8} />
              Todas
            </TextButtonSmall>
            <TextButtonSmall sidebar noUnderline lowOpacity to='/assigned' onClick={() => handleClick('/assigned')} active={path === '/assigned'}>
              <Icon as={icons.assigned} size={20} mr={8} />
              Asignadas
            </TextButtonSmall>
          </ul>
        </li>
        <li>
          <TextButtonSmall sidebar noUnderline lowOpacity to='/trash' onClick={() => handleClick('/trash')} active={path === '/trash'}>
            <Icon as={icons.trash} size={20} mr={8} />
            Papelera
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall sidebar noUnderline lowOpacity to='/my-team' onClick={() => handleClick('/my-team')} active={path === '/my-team'}>
            <Icon as={icons.team} size={20} mr={8} />
            Mi equipo
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall sidebar noUnderline lowOpacity to='/settings' onClick={() => handleClick('/settings')} active={path === '/settings'}>
            <Icon as={icons.settings} size={20} mr={8} />
            Configuración
          </TextButtonSmall>
        </li>
        <li>
          <TextButtonSmall sidebar noUnderline lowOpacity onClick={() => dispatch(signOut())}>
            <Icon as={icons.logOut} size={20} mr={8} />
            Cerrar sesión
          </TextButtonSmall>
        </li>
      </NavLinks>
      <ProfileContainer openSidebar={openSidebar}>
        {loading ? <Spinner /> : <Profile imagePath={user.profilePhoto} imageSize={32} labelText={user.fullname} subLabelText={user.isAdmin ? `Admin. de ${user.teamId}` : `Miembro de ${user.teamId}`}/>}
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
  user-select: none;

  .logo {
    width: 60%;
    margin: 48px auto 16px auto;
  }

  hr {
    border: none;
    height: 1px;
    color: ${p => p.theme.styles.colors.white});
    background-color: ${p => p.theme.styles.colors.white});
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

  .innerList {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    margin-left: 32px;
  }

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