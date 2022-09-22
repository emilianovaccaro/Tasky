import React, { useEffect, useState } from 'react'
import { Content } from '../components/Content'
import { Title } from '../components/Text/Title'
import { SubTitle } from '../components/Text/SubTitle'
import { Card } from '../components/Card/Card'
import { BoxButton } from '../components/Button/BoxButton'
import { fetchTasks } from '../redux/actions/tasksActions'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Label } from '../components/Text/Label'
import { Task } from '../components/Task'
import { Spinner } from '../components/Spinner'
import { useLocation } from 'react-router-dom'

export const Tasks = ( {section}) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const tasks = useSelector(state => state.tasks)
  const user = useSelector(state => state.user.user)

  const [loading, setLoading] = useState(true)
  const [newTasks, setNewTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])
  const [openCloseModal, setOpenCloseModal] = useState(false)
  
  const sampleLocation = useLocation()

  useEffect(() => {
    dispatch(fetchTasks(token)).then(()=> {setLoading(false)})
  }, [])

  useEffect(() => {
    setNewTasks(tasks.filter(task => task.status === 'new' && !task.deleteStatus ))
    setInProgressTasks(tasks.filter(task => task.status === 'inProgress' && !task.deleteStatus ))
    setFinishedTasks(tasks.filter(task => task.status === 'finished' && !task.deleteStatus))

    if(section === 'trash') {
      setNewTasks(tasks.filter(task => task.status === 'new' && task.deleteStatus))
      setInProgressTasks(tasks.filter(task => task.status === 'inProgress' && task.deleteStatus))
      setFinishedTasks(tasks.filter(task => task.status === 'finished' && task.deleteStatus))
    }

    if(section === 'assigned') {
      setNewTasks(tasks.filter(task => task.status === 'new' && task.assignedTo === user.fullname && !task.deleteStatus))
      setInProgressTasks(tasks.filter(task => task.status === 'inProgress' && task.assignedTo === user.fullname && !task.deleteStatus))
      setFinishedTasks(tasks.filter(task => task.status === 'finished' && task.assignedTo === user.fullname && !task.deleteStatus))
    }
    
  }, [tasks, sampleLocation])


  return (
    <>
      <Content>
        {openCloseModal && <ModalContainer>soy Modal</ModalContainer>}
        <TasksHeader>
          {!section && <Title>Todas las tareas</Title>}
          {section === 'assigned' && <Title>Mis tareas</Title>}
          {section === 'trash' && <Title>Papelera</Title>}
          {(!section || section === 'assigned') && <BoxButton onClick={()=>{setOpenCloseModal(!openCloseModal)}}><Label black medium>Crear tarea</Label></BoxButton>}
        </TasksHeader>

        <TasksList>
          
          <Card tasks tasksContent headerChildren={<SubTitle>Próximas</SubTitle>}>
            {
              loading ? <Spinner /> :
                newTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  newTasks.map(task => ( 
                    <Task status='new' key={task._id} task={task}/>))
            }
          </Card>
          
          <Card tasks tasksContent headerChildren={<SubTitle>En proceso</SubTitle>}>
            {
              loading ? <Spinner /> :
                inProgressTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  inProgressTasks.map(task => ( 
                    <Task status='inProgress' key={task._id} task={task}/>))
            }
          </Card>

          <Card tasks tasksContent headerChildren={<SubTitle>Realizadas</SubTitle>}>
            {
              loading ? <Spinner /> :
                finishedTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  finishedTasks.map(task => ( 
                    <Task status='finished' key={task._id} task={task}/>))
            }
          </Card>
        </TasksList>
        
      </Content>
    </>
  )
}


const TasksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TasksList = styled.div`
  display: flex;
  gap: 32px;
  align-items: baseline;

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    flex-direction: column;
  }
`

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: red;
`