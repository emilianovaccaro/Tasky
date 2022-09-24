import React, { useState } from 'react'
import { Modal } from '../components/Modal'
import { IconButton } from '../components/Button/IconButton'
import { Input } from '../components/Inputs/Input'
import { SubLabel } from '../components/Text/SubLabel'
import { Icon, icons } from '../components/Icon'
import { SubTitle } from '../components/Text/SubTitle'
import { BoxButton } from '../components/Button/BoxButton'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as yup from 'yup'
import { createTask, updateTask } from '../redux/actions/tasksActions'

const validationSchema = yup.object().shape({
  title: 
    yup.string()
      .required('campo obligatorio')
      .matches(/^[aA-zZ\s]+$/, 'el campo solo admite letras'),
  priority: 
    yup.string()
      .required('campo obligatorio'),
  description: 
    yup.string(),
  status: 
    yup.string()
      .required('campo obligatorio'),
  assignedTo:
    yup.string()
})

const ChangePassForm = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const defaultValues = {
    password: '',
    repeatPassword: '',
    newPassword: '',
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      
      try {
       
        dispatch(createTask(values, token))
       
      } catch (error) {
        console.log(error)
      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal inputs multipleInputs>
      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <SubTitle>Cambiar contrasenia</SubTitle>
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
            inputLabel={'Contraseña'}
            maxLength={40} 
          />
        </InputsContainer>
        <InputsContainer>
          <Input 
            touched={ touched.repeatPassword } 
            error={ errors.repeatPassword } 
            name='repeatPassword' 
            onChange={ handleChange } 
            value={ values.password } 
            onBlur={ handleBlur } 
            type={'password'} 
            id="repeatPassword" 
            icon={<Icon as={icons.eye} white />} 
            inputLabel={'Repetir contraseña'}
            maxLength={40} 
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
            inputLabel={'Nueva contraseña'}
            maxLength={40} 
          />
        </InputsContainer>
        
        
        <ButtonsContainer>
          <SubLabel button type='button' onClick={() => {toggleModal(false)}} >Cancelar</SubLabel>
          <BoxButton type='submit'>Cambiar</BoxButton>
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
  margin-top: 24px;

  button {
    margin: unset;
  }
`

const ErrorContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

export default ChangePassForm