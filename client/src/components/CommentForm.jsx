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
import Swal from 'sweetalert2'
import { Spinner } from './Spinner'

const validationSchema = yup.object().shape({
  comments: 
      yup.string()
        .required('obligatorio')
        .min(6, 'mínimo 6 caracteres')
})


const CommentForm = ({ taskProps, toggleComment }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [ loading, setLoading ] = useState(false)
  const [ commentError, setCommentError ] = useState('')


  const defaultValues = {
    comments: ''
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await dispatch(updateTask(taskProps._id, values, token))
        setLoading(false)
        toggleComment(false)
      } catch (error) {
        setCommentError(error.response.data)
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: `Oops... Error: ${error?.response.status}`,
          text: `${error?.response?.data?.msg}`
        })
      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal inputs="true" >
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
          height="true"
          onBlur={handleBlur}
          placeholder={'comentario'}
        />
        <ErrorContainer>
          {commentError && <SubLabel error registerError>{`${commentError?.msg}`}</SubLabel>}
        </ErrorContainer>
        
        <ButtonsContainer>
          { !loading ? (
            <>
              <SubLabel button type='button' onClick={() => {toggleComment(false)}}>Cancelar</SubLabel>
              <BoxButton type='submit' button>Añadir comentario</BoxButton>
            </>
          ) : ( <Spinner /> )}
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