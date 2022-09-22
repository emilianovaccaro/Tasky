import React,{ useEffect, useState } from 'react'
import { Content } from '../components/Content'
import { Title } from '../components/Text/Title'
import { Card } from '../components/Card/Card'
import { BoxButton } from '../components/Button/BoxButton'
import { fetchTasks } from '../redux/actions/tasksActions'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Label } from '../components/Text/Label'
import { Task } from '../components/Task'

export const Tasks = ( {section}) => {

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const tasks = useSelector(state => state.tasks)

  const [showMore, setShowMore] = useState(null)
  const [taskNew, setTaskNew] = useState([])
  const [taskInProgress, setTaskInProgress] = useState([])
  const [taskFinished, setTaskFinished] = useState([])

  useEffect(() => {
    dispatch(fetchTasks(token))
  }, [])

  useEffect(() => {
    setTaskNew(tasks.filter(task => task.status === 'new'))
    setTaskInProgress(tasks.filter(task => task.status === 'inProgress'))
    setTaskFinished(tasks.filter(task => task.status === 'finished'))
  }, [tasks])

  return (
    <>
      <Content>
        <TasksHeader>
          {!section && <Title>Todas las tareas</Title>}
          {section === 'assigned' && <Title>Mis tareas</Title>}
          {section === 'trash' && <Title>Papelera</Title>}
          {(!section || section === 'assigned') && <BoxButton><Label black medium>Crear tarea</Label></BoxButton>}
        </TasksHeader>

        <TasksList>
          <Card headerChildren={<Label semiBold>Próximas</Label>}>
            {taskNew.length === 0 && <Label semiBold>No hay tareas</Label>}
            {taskNew.map(task => (
              <Task key={task._id} task={task} showMore={showMore} setShowMore={setShowMore} />
            ))}
          </Card>
          <Card headerChildren={<Label semiBold>En proceso</Label>}>
            {taskInProgress.length === 0 && <Label semiBold>No hay tareas</Label>}
            {taskInProgress.map(task => (
              <Task key={task._id} task={task} showMore={showMore} setShowMore={setShowMore} />
            ))}
          </Card>
          <Card headerChildren={<Label semiBold>Realizadas</Label>}>
            {taskFinished.length === 0 && <Label semiBold>No hay tareas</Label>}
            {taskFinished.map(task => (
              <Task key={task._id} task={task} showMore={showMore} setShowMore={setShowMore} />
            ))}
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
  
`

