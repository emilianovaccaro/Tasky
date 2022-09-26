import React, { useState } from 'react'
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
import { Spinner } from '../components/Spinner'

export const Login = () => {
  const [section, setSection] = React.useState('login')
  const [dbError, setDbError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    username: 
    yup.string()
      .required('campo obligatorio')
      .min(4, 'mínimo 4 caracteres')
      .max(24, 'máximo 24 caracteres'),
    password: 
      yup.string()
        .required('campo obligatorio'),
    usernameForgot:
    yup.string()
      .min(6, 'mínimo 6 caracteres')
      .max(24, 'máximo 24 caracteres'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      usernameForgot: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await dispatch(signIn(values))
        setLoading(false)
        return navigate('/')
      } catch (error) {
        setDbError(error.response.data)
        setLoading(false)
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
            <Input touched={ touched.username } error={ errors.username } name='username' onChange={ handleChange } value={ values.username } onBlur={ handleBlur } type={'text'} id="username" inputLabel={'Nombre de usuario'} fullWidth placeholder={'nombre de usuario'} />
          </div>
          <div>
            <Input touched={ touched.password } error={ errors.password } name='password' onChange={ handleChange } value={ values.password } onBlur={ handleBlur } type={'password'} id="password" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña'} maxLength={40} fullWidth placeholder={'contraseña'} />
            <SubLabel onClick={() => setSection('forgot-password')} button className='forgot-password'>Olvidé mi contraseña</SubLabel>
          </div>
          {dbError && <SubLabel error>{`${dbError?.msg}`}</SubLabel>}
          { !loading ? (
            <BoxButton type='submit' button>Iniciar sesión</BoxButton>
          ) : (<Spinner />)}
        </form>
        }

        {section === 'forgot-password' &&
        <form onSubmit={handleSubmit}>
          <Label paragraph>Ingresa tu nombre de usuario para que podamos enviarte un correo electrónico con tu nueva contraseña.</Label>
          <div>
            <Input touched={touched.usernameForgot} error={errors.usernameForgot} name='usernameForgot' onChange={ handleChange } value={ values.usernameForgot} onBlur={ handleBlur } type={'text'} id="usernameForgot" inputLabel={'Nombre de usuario *'} fullWidth placeholder={'nombre de usuario'} />
          </div>
          <ButtonsContainer>
            <Label button icon onClick={() => setSection('login')}><Icon as={icons.back} size={20} mr={8} />Atrás</Label>
            <BoxButton type='submit' button>Enviar</BoxButton>
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
