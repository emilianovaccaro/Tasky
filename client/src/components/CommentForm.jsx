import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../components/Modal'
import { IconButton } from '../components/Button/IconButton'
import { SubLabel } from '../components/Text/SubLabel'
import { Icon, icons } from '../components/Icon'
import { SubTitle } from '../components/Text/SubTitle'
import { BoxButton } from '../components/Button/BoxButton'
import { TextArea } from './Inputs/TextArea'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as yup from 'yup'
import { updateTask } from '../redux/actions/tasksActions'

const validationSchema = yup.object().shape({
  comments: 
      yup.string()
        .required('obligatorio')
        .min(6, 'mínimo 6 caracteres')
})


const CommentForm = ({ taskProps, toggleComment }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [ commentError, setCommentError ] = useState('')


  const defaultValues = {
    comments: ''
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(updateTask(taskProps._id, values, token))
        toggleComment(false)
      } catch (error) {
        setCommentError(error.response.data)
      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <SubTitle>Añadir comentario</SubTitle>
          <IconButton button type='button' onClick={() => {toggleComment(false)}}> <Icon as={icons.close} white={'white'} /></IconButton>
        </InputsContainer>

        <TextArea name='comments' id='comments' inputLabel={'Descripción'} 
          touched={touched.comments} 
          error={touched.comments && errors.comments}
          onChange={handleChange}
          value={values.comments}
          height={true}
          onBlur={handleBlur}
          placeholder={'comentario'}
        />
        <ErrorContainer>
          {commentError && <SubLabel error registerError>{`${commentError?.msg}`}</SubLabel>}
        </ErrorContainer>
        
        <ButtonsContainer>
          <SubLabel button type='button' onClick={() => {toggleComment(false)}}>Cancelar</SubLabel>
          <BoxButton type='submit'>Añadir comentario</BoxButton>
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
  margin-top: 24px;
`

export default CommentForm