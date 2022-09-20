import React from 'react'
import styled from 'styled-components'

import { Title } from '../components/Text/Title'
import { Label } from '../components/Text/Label'
import { TextButtonSmall } from '../components/button/TextButtonSmall'

export const Error404 = () => {
  return (
    <ErrorContainer>
      <img src={'../src/assets/logo-banner.svg'} alt={'Tasky logo'} className='logo' />
      <Title extraBig>Error 404</Title>
      <Label>No encontramos lo que estás buscando</Label>
      <TextButtonSmall to="/">Ir a inicio</TextButtonSmall>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.div`
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
  margin: auto;

  .logo {
    width: 50%;
    max-width: 128px;
  }

`