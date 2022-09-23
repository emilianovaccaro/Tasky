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
import { createTask } from '../redux/actions/tasksActions'
import { useNavigate } from 'react-router-dom'


const validationSchema = yup.object().shape({
  title: 
    yup.string()
      .required('Campo obligatorio')
      .min(6, 'mínimo 6 caracteres')
      .matches(/^[aA-zZ]+$/, 'El campo solo admite letras'),
  priority: 
    yup.string()
      .required('Campo obligatorio'),
  description: 
    yup.string()
      .required('Campo obligatorio'),
  status: 
    yup.string()
      .required('Campo obligatorio'),
  assignedTo:
    yup.string()
})



const TaskForm = ({ toggleModal, taskValues = {} }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { team } = useSelector(state => state.user)
  const [ taskError, setTaskError ] = useState('')

  const defaultValues = taskValues || {
    title: '',
    priority: 'low',
    description: '',
    assignedTo: '',
    status: 'new',
    deleteStatus: false
  }
  
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      values.deleteStatus = false
      
      try {
        await dispatch(createTask(values, token))
        navigate('/')
        return toggleModal(false)
      } catch (error) {
        setTaskError(error.response.data)
      }
    }
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched } = formik

  return (
    <Modal inputs multipleInputs>
      <form onSubmit={handleSubmit}>
        <>
          <InputsContainer>
            <SubTitle>Crear tarea</SubTitle>
            <IconButton button onClick={() => toggleModal(false)}> <Icon as={icons.close} white={'white'}  /></IconButton>
          </InputsContainer>

          <InputsContainer>
            <Input name='title' type={'text'} 
              id="title" inputLabel={'Titulo'}
              touched={touched.title} 
              error={errors.title}
              onChange={handleChange}
              value={values.title}
              onBlur={handleBlur}
            />

            <Select type={'text'} id="status" inputLabel={'Estado'} name='status'
              touched={touched.status} 
              error={errors.status}
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
            <Select type={'text'} id="priority" inputLabel={'Prioridad'} name='priority' 
              touched={touched.priority} 
              error={errors.priority}
              onChange={handleChange}
              value={values.priority}
              onBlur={handleBlur}
            >
              <option value='low'>Baja</option>
              <option value='medium'>Media</option>
              <option value='high'>Alta</option>
            </Select>

            <Select type={'text'} id="assigned" inputLabel={'Asignado'} name='assignedTo'
              touched={touched.assignedTo} 
              error={errors.assignedTo}
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
            error={errors.description}
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
          />
          <div>
            {taskError && <SubLabel error registerError>{`${taskError?.msg}`}</SubLabel>}
            <SubLabel button onClick={() => toggleModal(false)}>Cerrar</SubLabel>
            <BoxButton type='submit' >Crear</BoxButton>
          </div>
        </>
      </form>
    </Modal>
  )
}

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: column;
  }
`

export default TaskForm