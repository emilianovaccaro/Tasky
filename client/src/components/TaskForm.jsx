import React, { useState } from 'react'
import { Modal } from '../components/Modal'
import { IconButton } from '../components/Button/IconButton'
import { Input } from '../components/Inputs/Input'
import { Select } from '../components/Inputs/Select'
import { TextArea } from '../components/Inputs/TextArea'
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
    yup.string()
      .required('campo obligatorio'),
  status: 
    yup.string()
      .required('campo obligatorio'),
  assignedTo:
    yup.string()
})

const TaskForm = (props) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { team } = useSelector(state => state.user)
  const [ taskError, setTaskError ] = useState('')

  const defaultValues = {
    title: props.taskProps.title || '',
    priority: props.taskProps.priority || 'low',
    description: props.taskProps.description || '',
    assignedTo: props.taskProps.assignedTo || '',
    status: props.taskProps.status || 'new',
    deleteStatus: false
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      values.deleteStatus = false
      
      try {
        if (!props.taskProps._id) {
          dispatch(createTask(values, token))
        } else {
          dispatch(updateTask(props.taskProps._id, values, token))
        }
        return props.toggleModal(false)
      } catch (error) {
        setTaskError(error.response.data)
      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal inputs multipleInputs>
      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <SubTitle>Crear tarea</SubTitle>
          <IconButton button type='button' onClick={() => {props.toggleModal(false)}}> <Icon as={icons.close} white={'white'} /></IconButton>
        </InputsContainer>

        <InputsContainer>
          <Input name='title' type={'text'} 
            id='title' inputLabel={'Título *'}
            touched={touched.title} 
            error={touched.title && errors.title}
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
            fullWidth
          />

          <Select fullWidth type={'text'} id="status" inputLabel={'Estado'} name='status'
            touched={ touched.status} 
            error={touched.status && errors.status}
            onChange={handleChange}
            value={values.status}
            onBlur={handleBlur}
          >
            <option value='new'>Nueva</option>
            <option value='inProgress'>En proceso</option>
            <option value='finished'>Realizada</option>
          </Select>
        </InputsContainer>

        <InputsContainer>
          <Select fullWidth type={'text'} id="priority" inputLabel={'Prioridad'} name='priority' 
            touched={touched.priority} 
            error={touched.priority && errors.priority}
            onChange={handleChange}
            value={values.priority}
            onBlur={handleBlur}
          >
            <option value='low'>Baja</option>
            <option value='medium'>Media</option>
            <option value='high'>Alta</option>
          </Select>

          <Select fullWidth type={'text'} id="assigned" inputLabel={'Asignado'} name='assignedTo'
            touched={touched.assignedTo} 
            error={touched.assignedTo && errors.assignedTo}
            onChange={handleChange}
            value={values.assignedTo}
            onBlur={handleBlur}
          >
            <option value=''></option>
            {team?.map(member => <option key={member._id} value={`${member.fullname}`}>{member.fullname}</option>)}
          </Select>
        </InputsContainer>

        <TextArea name='description' id='description' inputLabel={'Descripción'} 
          touched={touched.description} 
          error={touched.description && errors.description}
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
        />
        <ErrorContainer>
          {taskError && <SubLabel error registerError>{`${taskError?.msg}`}</SubLabel>}
        </ErrorContainer>
        
        <ButtonsContainer>
          <SubLabel button type='button' onClick={() => {props.toggleModal(false)}}>Cancelar</SubLabel>
          <BoxButton type='submit'>Crear</BoxButton>
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

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: column;
  }
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

export default TaskForm