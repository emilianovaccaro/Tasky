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
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Spinner } from './Spinner'

const validationSchema = yup.object().shape({
  title: 
    yup.string()
      .required('campo obligatorio')
      .min(3, 'mínimo 3 caracteres'),
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

const TaskForm = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [ loading, setLoading ] = useState(false)
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
      values.deleteStatus = false
      setLoading(true)
      try {
        if (!props.taskProps._id) {
          await dispatch(createTask(values, token))
        } else {
          await dispatch(updateTask(props.taskProps._id, values, token))
        }
        setLoading(false)
        props.toggleModal(false)
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
    <Modal inputs>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <SubTitle>{!props.taskProps._id ? 'Crear tarea' : 'Editar tarea'}</SubTitle>
          <IconButton button type='button' onClick={() => {props.toggleModal(false)}}> <Icon as={icons.close} white={'white'} /></IconButton>
        </ModalHeader>

        <InputsContainer>
          <Input name='title' type={'text'} 
            id='title' inputLabel={'Título *'}
            touched={touched.title} 
            error={touched.title && errors.title}
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
            fullWidth
            placeholder={'título'}
          />
        </InputsContainer>
        <InputsContainer>
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
        </InputsContainer>
        <InputsContainer>
          <Select fullWidth type={'text'} id="assigned" inputLabel={'Asignado'} name='assignedTo'
            touched={touched.assignedTo} 
            error={touched.assignedTo && errors.assignedTo}
            onChange={handleChange}
            value={values.assignedTo}
            onBlur={handleBlur}
          >
            <option value=''>No asignado</option>
            {team?.map(member => <option key={member._id} value={`${member.fullname}`}>{member.fullname}</option>)}
          </Select>
        </InputsContainer>
        <TextArea name='description' id='description' inputLabel={'Descripción'} 
          touched={touched.description} 
          error={touched.description && errors.description}
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
          placeholder={'descripción'}
        />
        
        <ErrorContainer>
          {taskError && <SubLabel error registerError>{`${taskError?.msg}`}</SubLabel>}
        </ErrorContainer>

        <ButtonsContainer>
          {
            !loading ? (
              <>
                <SubLabel button type='button' onClick={() => {props.toggleModal(false)}}>Cancelar</SubLabel>
                <BoxButton type='submit' button>{!props.taskProps._id ? 'Crear' : 'Guardar'}</BoxButton>
              </>
            ) : (<Spinner />)
          }
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

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
`


export default TaskForm