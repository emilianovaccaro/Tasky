import React from 'react'
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
import { createTask } from '../redux/actions/tasksActions'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as yup from 'yup'


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
      .required('Campo obligatorio')
})



const TaskForm = ({toggle}) => {
  const dispatch = useDispatch()
  const { team } = useSelector(state => state.user)
  const token = localStorage.getItem('token')


  const formSubmit = (values) => {
    console.log(values)
    values.deleteStatus = false


    /* 
      try {
        await dispatch(createTask(values, token))
        toggle(false)
      }
    
    */
  } 


  
  const formik = useFormik({
    initialValues: {
      title: '',
      priority: '',
      description: '',
      assignedTo: '',
      status: '',
      deleteStatus: false
    },
    validationSchema,
    onSubmit: formSubmit,
  })

  const {errors, values, handleChange, handleSubmit, handleBlur, touched} = formik

  return (
    <Modal inputs multipleInputs>
      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <SubTitle>Crear tarea</SubTitle>
          <IconButton button onClick={() => toggle(false)}> <Icon as={icons.close} white={'white'}  /></IconButton>
        </InputsContainer>
        <InputsContainer>
          <Input name='title' type={'text'} 
            id="title" inputLabel={'Titulo'}

          
          />
          <Select type={'text'} id="status" inputLabel={'Estado'} name='status' >
            <option value='new'>Nueva</option>
            <option value='inProgress'>En proceso</option>
            <option value='finished'>Realizada</option>
          </Select>
        </InputsContainer>
        <InputsContainer>
          <Select type={'text'} id="priority" inputLabel={'Prioridad'} >
            <option value='low'>Baja</option>
            <option value='medium'>Media</option>
            <option value='high'>Alta</option>
          </Select>
          <Select type={'text'} id="assigned" inputLabel={'Asignado'} name='assignedTo'>
            {team?.map(member => <option key={member._id} value={member.fullname}>{member.fullname}</option>)}
          </Select>
        </InputsContainer>
        <TextArea name='description' id='description' inputLabel={'Descripción'} />
        <div>
          <SubLabel button onClick={() => toggle(false)}>Cerrar</SubLabel>
          <BoxButton type='submit'>Crear</BoxButton>
        </div>
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