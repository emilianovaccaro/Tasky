import React from 'react'
import styled from 'styled-components'
import { Card } from '../components/card/card'
import { Label } from '../components/text/Label'
import { TextButtonSmall } from '../components/button/TextButtonSmall'
import { TextButtonExtraSmall } from '../components/button/TextButtonExtraSmall'
import { Input } from '../components/Inputs/Input'
import { BoxButton } from '../components/button/BoxButton'
import { Icon, icons } from '../components/Icon'

export const Login = () => {
  return (
    <Container>
      <Card headerChildren={ <img src={'../src/assets/logo-banner.svg'} alt={'Tasky logo'} className='logo' />} defaultColor>
        <Input type={'text'} id="text" inputLabel={'Ingrese su email'} error={'email incorrecto'} />
        <Input type={'password'}id="password" icon={<Icon as={icons.eye} white />} inputLabel={'Ingrese su contraseña'} error={'contraseña incorrecta'} />
        <TextButtonExtraSmall to="/register">Olvidé mi contraseña</TextButtonExtraSmall>
        <BoxButton><Label black medium>Iniciar sesion</Label></BoxButton>
      </Card>
      <Label>¿No tienes una cuenta? {' '}</Label><TextButtonSmall to="/register">Regístrate</TextButtonSmall>
    </Container>
  )
}

const Container = styled.div`
  
`