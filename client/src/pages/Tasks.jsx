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
import { useLocation, useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'

export const Tasks = ( {section}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const tasks = useSelector(state => state.tasks)
  const user = useSelector(state => state.user.user)

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [newTasks, setNewTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])
  const [openCloseModal, setOpenCloseModal] = useState(false)
  const [ thisTask, setThisTask ] = useState({})
  
  const sampleLocation = useLocation()
  
  const fetchTaskReq = async () => {
    setLoading(true)
    try {
      await dispatch(fetchTasks(token))
    } catch(error) {
      return navigate('/login')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTaskReq()
  }, [token])

  useEffect(() => {
    setOpenCloseModal(false)
    setList(tasks)
    updateNewTasks()
    updateInProgressTasks()
    updateFinishedTasks()
  }, [tasks, sampleLocation, list])

  

  const updateNewTasks = () => {
    let deleteStat = false
    if (section === 'trash') {
      deleteStat = true
    }

    if (section === 'assigned') {
      return setNewTasks(list.filter(task => task.status === 'new' && task.assignedTo === user.fullname && !task.deleteStatus))
    }

    return setNewTasks(list.filter(task => task.status === 'new' && task.deleteStatus === deleteStat))
  }

  const updateInProgressTasks = () => {
    let deleteStat = false
    if (section === 'trash') {
      deleteStat = true
    }

    if (section === 'assigned') {
      return setInProgressTasks(list.filter(task => task.status === 'inProgress' && task.assignedTo === user.fullname && !task.deleteStatus))
    }

    return setInProgressTasks(list.filter(task => task.status === 'inProgress' && task.deleteStatus === deleteStat ))
  }

  const updateFinishedTasks = () => {
    let deleteStat = false
    if (section === 'trash') {
      deleteStat = true
    } 

    if (section === 'assigned') {
      return setFinishedTasks(list.filter(task => task.status === 'finished' && task.assignedTo === user.fullname && !task.deleteStatus))
    }
    
    return setFinishedTasks(list.filter(task => task.status === 'finished' && task.deleteStatus === deleteStat))
  }

  return (
    <>
      <Content>

        {openCloseModal && <TaskForm toggleModal={setOpenCloseModal} taskProps={thisTask} />}

        <TasksHeader>
          {!section && <Title>Todas las tareas</Title>}
          {section === 'assigned' && <Title>Mis tareas</Title>}
          {section === 'trash' && <Title>Papelera</Title>}
          {(!section || section === 'assigned') && <BoxButton 
            onClick={()=>{
              setOpenCloseModal(!openCloseModal)
              setThisTask({})
            }}><Label black medium>Crear tarea</Label></BoxButton>}
        </TasksHeader>

        <TasksList>
          
          <Card tasks tasksContent headerChildren={<SubTitle>Nuevas</SubTitle>}>
            {
              loading ? <Spinner /> :
                newTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  newTasks.map(task => ( 
                    <Task status='new' key={task._id} task={task} toggleModal={setOpenCloseModal} setTaskProps={setThisTask} />))
            }
          </Card>
          
          <Card tasks tasksContent headerChildren={<SubTitle>En proceso</SubTitle>}>
            {
              loading ? <Spinner /> :
                inProgressTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  inProgressTasks.map(task => ( 
                    <Task status='inProgress' key={task._id} task={task} toggleModal={setOpenCloseModal} setTaskProps={setThisTask}/>))
            }
          </Card>

          <Card tasks tasksContent headerChildren={<SubTitle>Realizadas</SubTitle>}>
            {
              loading ? <Spinner /> :
                finishedTasks.length === 0 ? <Label center>No hay tareas</Label> :
                  finishedTasks.map(task => ( 
                    <Task status='finished' key={task._id} task={task} toggleModal={setOpenCloseModal} setTaskProps={setThisTask}/>))
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