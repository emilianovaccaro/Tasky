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
import { updateProfile } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { SubLabel } from '../components/Text/SubLabel'
import TaskyLogoDark from '../assets/logo-banner-dark.svg'
import IconDefault from '../assets/icon-default.png'


export const TestUpdated = () => {
  const [section, setSection] = useState('page-1')
  const [ dbError, setDbError ] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')


  const validationSchema = yup.object().shape({
    file: 
      yup.mixed(),
  })

  const formik = useFormik({
    initialValues: {
      file: undefined,
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
        await dispatch(updateProfile(token, values))
        navigate('/')
      } catch (error) {
        setDbError(error.response.data)
      }
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched, setFieldValue } = formik

  return (
    <TestUpdatedContainer>
      <Card multipleInputs headerChildren={ <img src={TaskyLogoDark} alt={'Tasky logo'} className='logo' />} defaultColor>
        <form onSubmit={ handleSubmit }>
          <>
            <InputsContainer>
            </InputsContainer>
            <InputsContainer>
              <Input onChange={(event) => setFieldValue('file', event.currentTarget.files[0]) } touched={ touched.teamId } onBlur={ handleBlur } inputLabel={'Establecer foto de perfil'} type={'file'} name='profilePhoto' error={ errors.file } id='file' accept="image/png, image/jpeg" />
              

            </InputsContainer>
            <ButtonsContainer>
              <Label button icon onClick={() => setSection('page-1')}><Icon as={icons.back} size={20} mr={8} />Atrás</Label>
              <BoxButton type='submit' onClick={handleSubmit}><Label black medium>Confirmar</Label></BoxButton>
            </ButtonsContainer>
          </>
          
        </form>
      </Card>
    </TestUpdatedContainer>
  )
}

const TestUpdatedContainer = styled.div`
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