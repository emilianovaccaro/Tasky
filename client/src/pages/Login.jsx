import React from 'react'
import styled from 'styled-components'
import { Card } from '../components/Card/Card'
import { Label } from '../components/Text/Label'
import { SubLabel } from '../components/Text/SubLabel'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import { Input } from '../components/Inputs/Input'
import { BoxButton } from '../components/Button/BoxButton'
import { Icon, icons } from '../components/Icon'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import { signIn } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import TaskyLogoDark from '../assets/logo-banner-dark.svg'

export const Login = () => {
  const [section, setSection] = React.useState('login')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    username: 
    yup.string()
      .required('campo obligatorio')
      .min(6, 'mínimo 6 caracteres'),
    password: 
      yup.string()
        .required('campo obligatorio'),
    usernameForgot:
    yup.string()
      .min(6, 'mínimo 6 caracteres')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      usernameForgot: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(signIn(values))
        return navigate('/')
      } catch (error) {
        console.log(error.message)
      }
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched} = formik

  
  return (
    <LoginContainer>
      <Card inputs headerChildren={ <img src={TaskyLogoDark} alt={'Tasky logo'} className='logo' />} defaultColor>

        {section === 'login' &&
        <form onSubmit={handleSubmit}>
          <div>
            <Input touched={ touched.username } error={ errors.username } name='username' onChange={ handleChange } value={ values.username } onBlur={ handleBlur } type={'text'} id="username" inputLabel={'Nombre de usuario'} fullWidth />
          </div>
          <div>
            <Input touched={ touched.password } error={ errors.password } name='password' onChange={ handleChange } value={ values.password } onBlur={ handleBlur } type={'password'} id="password" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña'} maxLength={40} fullWidth />
            <SubLabel onClick={() => setSection('forgot-password')} button className='forgot-password'>Olvidé mi contraseña</SubLabel>
          </div>
          <BoxButton type='submit'><Label black medium>Iniciar sesión</Label></BoxButton>
        </form>
        }

        {section === 'forgot-password' &&
        <form onSubmit={handleSubmit}>
          <Label paragraph>Ingresa tu nombre de usuario para que podamos enviarte un correo electrónico con tu nueva contraseña.</Label>
          <div>
            <Input touched={touched.usernameForgot} error={errors.usernameForgot} name='usernameForgot' onChange={ handleChange } value={ values.usernameForgot} onBlur={ handleBlur } type={'text'} id="usernameForgot" inputLabel={'Nombre de usuario'} fullWidth />
          </div>
          <ButtonsContainer>
            <Label button icon onClick={() => setSection('login')}><Icon as={icons.back} size={20} mr={8} />Atrás</Label>
            <BoxButton type='submit'><Label black medium>Enviar</Label></BoxButton>
          </ButtonsContainer>
        </form>
        }

      </Card>
      <Label>¿No tienes una cuenta? <TextButtonSmall to="/register">Regístrate</TextButtonSmall></Label>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .logo {
    width: 32%;
    max-width: 110px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .forgot-password {
    display: block;
    margin-top: 8px;
  }

  button {
    margin: auto;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;

  button {
    margin: unset;
  }

`
