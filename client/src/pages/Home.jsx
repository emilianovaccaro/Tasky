import React from 'react'
import styled from 'styled-components'
import { Label } from '../components/Text/Label'
import { SubTitle } from '../components/Text/SubTitle'
import TaskyLogo from '../assets/logo-banner.svg'

export const Home = () => {
  return(
    <LandingContainer>
      <InfoContainer>
        <img src={TaskyLogo} alt={'Tasky logo'} className='logo' />
        <SubTitle>Tasky es una herramienta gratuita que simplifica la organización de proyectos en equipo, permitiendo la   colaboración, priorización y el asignado de tareas.</SubTitle>
        <Label>Esta herramienta fue desarrollada para la <a href='https://www.alkemy.org/acceleration' target='_blank' rel='noreferrer'>aceleración de Alkemy en Front-End con React</a>.</Label>
      </InfoContainer>
      <ImagesContainer>
        <img src={TaskyLogo} alt={'Tasky logo'} className='logo' />
      </ImagesContainer>
    </LandingContainer>
  )
}

const LandingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin: 64px 0;
  height: calc(100vh - 128px);
  `

const InfoContainer = styled.div`
  width: 40vw;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  position: fixed;
  left: 10vw;
  padding-right: 32px;

  .logo {
    width: 256px;
  }

  h3 {
    max-width: 600px;
    line-height: 28px;
  }

  label {
    max-width: 600px;
  }

  a {
    text-decoration: underline;
    color: #FFFFFF;
  }
`

const ImagesContainer = styled.div`
  position: absolute;
  left: 50vw;
  width: 40vw;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding-left: 32px;
`