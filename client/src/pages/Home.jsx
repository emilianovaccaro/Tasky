import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Label } from '../components/Text/Label'
import { SubTitle } from '../components/Text/SubTitle'
import { BoxButton } from '../components/Button/BoxButton'
import TaskyLogo from '../assets/logo-banner.svg'
import Imagen1 from '../assets/imagen-1.jpg'
import Imagen2 from '../assets/imagen-2.jpg'
import Imagen3 from '../assets/imagen-3.jpg'
import Imagen4 from '../assets/imagen-4.jpg'


export const Home = () => {
  useEffect(() => {
    var styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode('body::-webkit-scrollbar {display: unset} '))
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }, [])

  return(
    <>
      <InfoContainer>
        <img src={TaskyLogo} alt={'Tasky logo'} className='logo' />
        <SubTitle>Tasky simplifica la organización de proyectos en equipo, permitiendo la colaboración, priorización y el asignado de tareas.</SubTitle>
        <Label>Esta herramienta fue desarrollada para la <a href='https://www.alkemy.org/acceleration' target='_blank' rel='noreferrer'>aceleración de Alkemy en Front-End con React</a>.</Label>
        <Label>Tasky es de <a href='https://github.com/emilianovaccaro/Tasky' target='_blank' rel='noreferrer'>código abierto</a>.</Label>
        <ButtonsContainer>
          <Link to='/login'><BoxButton button>Iniciar sesión</BoxButton></Link>
          <Link to='/register'><BoxButton button>Registrarme</BoxButton></Link>
        </ButtonsContainer>
      </InfoContainer>
      <ImagesContainer>
        <Image>
          <img src={Imagen1} alt={'Interfaz Tasky'} />
          <SubTitle>Ten todas las tareas de tu equipo en un solo lugar</SubTitle>
        </Image>
        <Image>
          <img src={Imagen2} alt={'Interfaz Tasky'} />
          <SubTitle>Puedes crear tareas y asignarlas a tus compañeros de equipo</SubTitle>
        </Image>
        <Image>
          <img src={Imagen3} alt={'Interfaz Tasky'} />
          <SubTitle>Ten a mano la información de tu equipo</SubTitle>
        </Image>
        <Image>
          <img src={Imagen4} alt={'Interfaz Tasky'} />
          <SubTitle>Puedes personalizar el fondo y los colores a tu gusto</SubTitle>
        </Image>
      </ImagesContainer>
    </>
  )
}

const InfoContainer = styled.div`
  width: 30vw;
  left: calc(7.5vw - 32px);
  padding-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  top: 25vh;
  gap: 32px;
  position: fixed;

  .logo {
    width: 256px;
  }

  h3 {
    line-height: 28px;
  }

  label {
    line-height: 20px;
  }

  a {
    text-decoration: underline;
    color: #FFFFFF;
  }

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    position: unset;
    height: unset;
    left: unset;
    top: unset;
    padding-right: unset;

    width: 85vw;
    margin: auto;
    margin-top: 64px;

    .logo {
      width: 192px;
    }

  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  
  button {
    transition: .2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const ImagesContainer = styled.div`
  position: absolute;
  width: calc(100vw - 30vw - 7.5vw - 73px);
  left: 37.5vw;
  top: 0;
  padding-top: 15vh;
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;

  img {
    border-radius: ${p => p.theme.styles.borderRadius.medium};
  }

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    position: unset;
    height: unset;
    left: unset;
    top: unset;
    padding-top: unset;
    padding-right: unset;
    padding-left: unset;
    overflow-y: unset;

    width: 85vw;
    margin: auto;
    margin-top: 64px;
  }

`

const Image= styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  margin-bottom: 64px;
  transition: .3s;

  &:hover {
    transform: scale(1.025);
  }

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    margin-bottom: 32px;
  }
`