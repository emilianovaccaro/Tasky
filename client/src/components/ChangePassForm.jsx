import React, { useState } from 'react'
import { Modal } from '../components/Modal'
import { IconButton } from '../components/Button/IconButton'
import { Input } from '../components/Inputs/Input'
import { SubLabel } from '../components/Text/SubLabel'
import { Icon, icons } from '../components/Icon'
import { SubTitle } from '../components/Text/SubTitle'
import { BoxButton } from '../components/Button/BoxButton'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { updateProfile } from '../redux/actions/userActions'
import { Spinner } from './Spinner'

const validationSchema = yup.object().shape({
  password: 
      yup.string()
        .min(6, 'mínimo 6 caracteres')
        .required('Ingrese su contraseña actual'),
  newPassword: 
  yup.string()
    .min(6, 'mínimo 6 caracteres')
    .required('Ingrese su nueva contraseña'),
  repeatNewPassword:
    yup.string()
      .required('campo obligatorio')
      .min(6, 'mínimo 6 caracteres')
      .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
})

const ChangePassForm = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const token = localStorage.getItem('token')

  const [ taskError, setTaskError ] = useState('')

  const defaultValues = {
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await dispatch(updateProfile(token, values))
        setLoading(false)
        toggleModal(false)
      } catch (error) {
        setTaskError(error.response.data)
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: `Oops... Error: ${error?.response.status}`,
          text: `${error?.response?.data?.msg}`
        })
        
        if (error?.response?.data?.id === 'noToken') {
          return setTimeout(() => {
            window.location.reload()
          }, 1000)
        }

      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal multipleInputs="true">
      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <SubTitle>Cambiar contraseña</SubTitle>
          <IconButton button type='button' onClick={() => { toggleModal(false)} }> <Icon as={icons.close} white={'white'} /></IconButton>
        </InputsContainer>

        <InputsContainer>
          <Input 
            touched={ touched.password } 
            error={ errors.password } 
            name='password' 
            onChange={ handleChange } 
            value={ values.password } 
            onBlur={ handleBlur } 
            type={'password'} 
            id="password" 
            icon={<Icon as={icons.eye} white />} 
            inputLabel={'Contraseña actual *'}
            maxLength={40}
            fullWidth
            placeholder={'contraseña actual'}
          />
        </InputsContainer>
        <InputsContainer>
          <Input 
            touched={ touched.newPassword } 
            error={ errors.newPassword } 
            name='newPassword' 
            onChange={ handleChange } 
            value={ values.newPassword } 
            onBlur={ handleBlur } 
            type={'password'} 
            id="newPassword" 
            icon={<Icon as={icons.eye} white />} 
            inputLabel={'Nueva contraseña *'}
            maxLength={40}
            fullWidth
            placeholder={'nueva contraseña'}
          />
        </InputsContainer>
        <InputsContainer>
          <Input 
            touched={ touched.repeatNewPassword } 
            error={ errors.repeatNewPassword } 
            name='repeatNewPassword' 
            onChange={ handleChange } 
            value={ values.repeatNewPassword } 
            onBlur={ handleBlur } 
            type={'password'} 
            id="repeatNewPassword" 
            icon={<Icon as={icons.eye} white />} 
            inputLabel={'Repetir nueva contraseña *'}
            maxLength={40} 
            fullWidth
            placeholder={'repetir nueva contraseña'}
          />
        </InputsContainer>
        <ErrorContainer>
          {taskError && <SubLabel error registerError>{`${taskError?.msg}`}</SubLabel>}
        </ErrorContainer>
        <ButtonsContainer>
          { !loading ? (
            <>
              <SubLabel button type='button' onClick={() => {toggleModal(false)}}>Cancelar</SubLabel>
              <BoxButton type='submit' button>Cambiar</BoxButton>
            </>
          ) : (<Spinner />)}
        </ButtonsContainer>
      </form>
    </Modal>
  )
}

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
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

const ErrorContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

export default ChangePassForm