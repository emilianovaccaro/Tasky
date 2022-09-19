import React from 'react'
import styled from 'styled-components'
import { Card } from '../components/card/card'
import { Label } from '../components/text/Label'
import { TextButtonSmall } from '../components/button/TextButtonSmall'
import { Input } from '../components/Inputs/Input'
import { Select } from '../components/Inputs/Select'
import { BoxButton } from '../components/button/BoxButton'
import { Icon, icons } from '../components/Icon'
import { useFormik } from 'formik'
import * as yup from 'yup'

export const Register = () => {
  const [section, setSection] = React.useState('page-1')

  const validationSchema = yup.object().shape({
    name: 
      yup.string()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres'),
    username: 
      yup.string()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres'),
    email: 
      yup.string()
        .required('campo obligatorio')
        .email('email invalido'),
    password: 
      yup.string()
        .min(6, 'el minimo de caracteres es 6')
        .required('campo obligatorio'),
    repeatPassword:
      yup.string()
        .required('campo obligatorio')
        .min(6, 'El minimo de caracteres es 6')
        .oneOf([yup.ref('password')], 'La contraseña no coincide'),
    teamId: 
      yup.string()
        .required('ingrese un ID'),
    teamPassword:
      yup.string()
        .required('campo obligatorio'),
    phoneNumber:
      yup.number('solo se permiten números')
        .required('campo obligatorio')
        .min(6, 'el minimo de caracteres es 6'),
    role:
      yup.string()
        .required('campo obligatorio'),
    radio:
      yup.string()
        .required('campo obligatorio'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      teamId:'',
      teamPassword: '',
      phoneNumber: '',
      role: '',
      radio: ''
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched} = formik

 
  return (
    <RegisterContainer>
      <Card multipleInputs headerChildren={ <img src={'../src/assets/logo-banner-dark.svg'} alt={'Tasky logo'} className='logo' />} defaultColor>

        {section === 'page-1' &&
        <form >
          <InputsContainer>
            <Input touched={ touched.email } error={ errors.email } name='email' onChange={ handleChange } value={ values.email } onBlur={ handleBlur } type={'email'} id="email" inputLabel={'Correo electrónico'} />
            <Input touched={ touched.username } error={ errors.username } name='username' onChange={ handleChange } value={ values.username } onBlur={ handleBlur } type={'text'} id="username" inputLabel={'Nombre de usuario'} />
          </InputsContainer>
          <InputsContainer>
            <Input touched={ touched.name } error={ errors.name } name='name' onChange={ handleChange } value={ values.name } onBlur={ handleBlur } type={'text'} id="name" inputLabel={'Nombre y Apellido'} />
            <Input touched={ touched.password } error={ errors.password } name='password' onChange={ handleChange } value={ values.password } onBlur={ handleBlur } type={'password'} id="password" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña'} maxLength={40} />
          </InputsContainer>
          <InputsContainer>
            <Input touched={ touched.repeatPassword } error={ errors.repeatPassword } name='repeatPassword' onChange={ handleChange } value={ values.repeatPassword } onBlur={ handleBlur } type={'password'} id="repeatPassword" icon={<Icon as={icons.eye} white />} inputLabel={'Repetir contraseña'} maxLength={40}  />
          </InputsContainer>
          <ButtonsContainer>
            <TextButtonSmall to={'/login'}><Icon as={icons.back} size={20} mr={8} />Atrás</TextButtonSmall>
            <BoxButton onClick={() => setSection('page-2')}><Label black medium>Siguiente</Label></BoxButton>
          </ButtonsContainer>
        </form>
        }
        
        {section === 'page-2' &&
        <form onSubmit={handleSubmit}>
          <InputsContainer>
            <Input touched={ touched.phoneNumber } error={ errors.phoneNumber } name='phoneNumber' onChange={ handleChange } value={ values.phoneNumber } onBlur={ handleBlur } type={'tel'} id="phoneNumber" inputLabel={'Teléfono'} />
            <Select touched={ touched.role } error={ errors.role } name='role' onChange={ handleChange } value={ values.role } onBlur={ handleBlur } type={'text'} id="role" inputLabel={'Rol'} >
              <option value='value1'>Value 1</option>
              <option value='value2'>Value 2</option>
              <option value='value3'>Value 3</option>
            </Select>
          </InputsContainer>
          <InputsContainer>
            {/* Aca va seleccionar imagen */}
            <RadioContainer>
              <Input type={'radio'} name='radio' id='radio1' radioSubLabel={'Crear un nuevo equipo'} inputLabel={'¿Qué deseas hacer?'} fullWidth />
              <Input type={'radio'} name='radio' id='radio2' radioSubLabel={'Unirme a un equipo ya existente'} fullWidth />
            </RadioContainer>
          </InputsContainer>
          <InputsContainer>
            <Input touched={ touched.teamId } error={ errors.teamId } name='teamId' onChange={ handleChange } value={ values.teamId } onBlur={ handleBlur } type={'teamId'} id="teamId" icon={<Icon as={icons.eye} white />} inputLabel={'ID del equipo (nuevo o existente)'} maxLength={40}  />
            <Input touched={ touched.teamPassword } error={ errors.teamPassword } name='teamPassword' onChange={ handleChange } value={ values.teamPassword } onBlur={ handleBlur } type={'password'} id="teamPassword" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña del equipo'} maxLength={40}  />
          </InputsContainer>
          <ButtonsContainer>
            <Label button icon onClick={() => setSection('page-1')}><Icon as={icons.back} size={20} mr={8} />Atrás</Label>
            <BoxButton type='submit' onClick={() => setSection('page-2')}><Label black medium>Confirmar</Label></BoxButton>
          </ButtonsContainer>
        </form>
        }

      </Card>
    </RegisterContainer>
  )
}

const RegisterContainer = styled.div`
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

  button {
    margin: auto;
  }
`

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InputsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: column;
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