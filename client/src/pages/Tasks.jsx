import React,{ useEffect } from 'react'
import { Content } from '../components/Content'
import { Title } from '../components/Text/Title'
import { Card } from '../components/Card/Card'
import { TaskCard } from '../components/Card/TaskCard'
import { BoxButton } from '../components/Button/BoxButton'
import { fetchTasks } from '../redux/actions/tasksActions'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Label } from '../components/Text/Label'
import { SubLabel } from '../components/Text/SubLabel'


export const Tasks = ( {section}) => {

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const tasks = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks(token))
  }, [])

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
            {tasks.filter(task => task.status === 'new').map(task => (
              <TaskCard status={'toDo'} key={task._id}>
                <Label>{task.title}</Label>
                <SubLabel lowOpacity>{task.assignedTo}</SubLabel>
                <SubLabel priority lowPriority>Low Priority</SubLabel>
              </TaskCard>
            ))}
          </Card>

          <Card headerChildren={<Label semiBold>En proceso</Label>}></Card>
          <Card headerChildren={<Label semiBold>Realizadas</Label>}></Card>
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
`