import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from '../components/Card/Card'
import { Label } from '../components/Text/Label'
import { TextButtonSmall } from '../components/Button/TextButtonSmall'
import { Input } from '../components/Inputs/Input'
import { Select } from '../components/Inputs/Select'
import { BoxButton } from '../components/Button/BoxButton'
import { Icon, icons } from '../components/Icon'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { register } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { SubLabel } from '../components/Text/SubLabel'
import TaskyLogoDark from '../assets/logo-banner-dark.svg'
import IconDefault from '../assets/icon-default.png'

export const Register = () => {
  const [section, setSection] = useState('page-1')
  const [ dbError, setDbError ] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    fullname: 
      yup.string()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres')
        .matches(/^[aA-zZ]+$/, 'El campo solo admite letras'),
    username: 
      yup.string()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres')
        .matches(/^[aA-zZ]+$/, 'El campo solo admite letras'),
    email: 
      yup.string()
        .required('campo obligatorio')
        .email('email inválido'),
    password: 
      yup.string()
        .min(6, 'mínimo 6 caracteres')
        .required('campo obligatorio'),
    repeatPassword:
      yup.string()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres')
        .oneOf([yup.ref('password')], 'las contraseñas no coinciden'),
    teamId: 
      yup.string()
        .required('ingrese un ID'),
    teamPassword:
      yup.string()
        .required('campo obligatorio'),
    phone:
      yup.string()
        .trim()
        .required('campo obligatorio')
        .min(6, 'mínimo 6 caracteres')
        .matches(/^[0-9]+$/, 'El campo solo admite números'),
    file: 
      yup.mixed(),
  })

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      teamId:'',
      teamPassword: '',
      phone: '',
      file: undefined,
      role: 'Analista de Datos',
      profilePhoto: IconDefault,
      isAdmin: false
    },
    validationSchema,
    onSubmit: async(values) => {
      
      if (values.isAdmin === 'true') {
        values.isAdmin = true
      } else if ( values.isAdmin === 'false') {
        values.isAdmin = false
      }
      
      try {
        setDbError('')
        await dispatch(register(values))
        navigate('/')
      } catch (error) {
        setDbError(error.response.data)
      }
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched, setFieldValue } = formik

  return (
    <RegisterContainer>
      <Card multipleInputs headerChildren={ <img src={TaskyLogoDark} alt={'Tasky logo'} className='logo' />} defaultColor>
        <form onSubmit={ handleSubmit }>
          {section === 'page-1' &&
          <>
            <InputsContainer>
              <Input touched={ touched.email } error={ errors.email } name='email' onChange={ handleChange } value={ values.email } onBlur={ handleBlur } type={'email'} id="email" inputLabel={'Correo electrónico'} />
              <Input touched={ touched.username } error={ errors.username } name='username' onChange={ handleChange } value={ values.username } onBlur={ handleBlur } type={'text'} id="username" inputLabel={'Nombre de usuario'} />
            </InputsContainer>
            <InputsContainer>
              <Input touched={ touched.fullname } error={ errors.fullname } name='fullname' onChange={ handleChange } value={ values.fullname } onBlur={ handleBlur } type={'text'} id="fullname" inputLabel={'Nombre y Apellido'} />
              <Input touched={ touched.password } error={ errors.password } name='password' onChange={ handleChange } value={ values.password } onBlur={ handleBlur } type={'password'} id="password" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña'} maxLength={40} />
            </InputsContainer>
            <InputsContainer>
              <Input touched={ touched.repeatPassword } error={ errors.repeatPassword } name='repeatPassword' onChange={ handleChange } value={ values.repeatPassword } onBlur={ handleBlur } type={'password'} id="repeatPassword" icon={<Icon as={icons.eye} white />} inputLabel={'Repetir contraseña'} maxLength={40}  />
            </InputsContainer>
            <ButtonsContainer>
              <TextButtonSmall to={'/login'}><Icon as={icons.back} size={20} mr={8} />Atrás</TextButtonSmall>
              <BoxButton onClick={() => setSection('page-2')}><Label black medium>Siguiente</Label></BoxButton>
            </ButtonsContainer>
          </>
          }
        
          {section === 'page-2' &&
          <>
            <InputsContainer>
              <Input touched={ touched.phone } error={ errors.phone } name='phone' onChange={ handleChange } value={ values.phone } onBlur={ handleBlur } type={'tel'} id="phone" inputLabel={'Teléfono'} />
              <Select touched={ touched.role } error={ errors.role } name='role' onChange={ handleChange } value={ values.role } onBlur={ handleBlur } type={'text'} id="role" inputLabel={'Rol'} >
                <option value='Analista de Calidad'>Analista de Calidad</option>
                <option value='Analista de Datos'>Analista de Datos</option>
                <option value='Desarrollador Back-End'>Desarrollador Back-End</option>
                <option value='Desarrollador Front-End'>Desarrollador Front-End</option>
                <option value='Desarrollador Full Stack'>Desarrollador Full Stack</option>
                <option value='Diseñador UX/UI'>Diseñador UX/UI</option>
                <option value='Otro'>Otro</option>
              </Select>
            </InputsContainer>
            <InputsContainer>
              <Input onChange={(event) => setFieldValue('file', event.currentTarget.files[0]) } touched={ touched.teamId } onBlur={ handleBlur } inputLabel={'Establecer foto de perfil'} type={'file'} name='profilePhoto' error={ errors.file } id='file' accept="image/png, image/jpeg" />
              
              <RadioContainer >
                <Input onChange={ handleChange } inputLabel={'¿Qué deseas hacer?'} type={'radio'} defaultChecked={'true'} name='isAdmin' error={ errors.radio } id='radio2' value={false} radioSubLabel={'Unirme a un equipo ya existente'} fullWidth />
                <Input onChange={ handleChange } type={'radio'} name='isAdmin' error={ errors.radio } id='radio1' value={true} radioSubLabel={'Crear un nuevo equipo'} fullWidth />
              </RadioContainer>
            </InputsContainer>
            <InputsContainer>
              <Input touched={ touched.teamId } error={ errors.teamId } name='teamId' onChange={ handleChange } value={ values.teamId } onBlur={ handleBlur } type={'teamId'} id="teamId" icon={<Icon as={icons.eye} white />} inputLabel={'ID del equipo (nuevo o existente)'} maxLength={40}  />
              <Input touched={ touched.teamPassword } error={ errors.teamPassword } name='teamPassword' onChange={ handleChange } value={ values.teamPassword } onBlur={ handleBlur } type={'password'} id="teamPassword" icon={<Icon as={icons.eye} white />} inputLabel={'Contraseña del equipo'} maxLength={40}  />
            </InputsContainer>
            <ButtonsContainer>
              <Label button icon onClick={() => setSection('page-1')}><Icon as={icons.back} size={20} mr={8} />Atrás</Label>
              <BoxButton type='submit' onClick={handleSubmit}><Label black medium>Confirmar</Label></BoxButton>
            </ButtonsContainer>
            {dbError && <SubLabel error registerError>{`${dbError?.msg}`}</SubLabel>}
          </>
          }
        </form>
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