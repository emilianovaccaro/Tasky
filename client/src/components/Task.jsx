import React from 'react'
import styled from 'styled-components'
import { TaskCard } from './Card/TaskCard'
import { Label } from './Text/Label'
import { SubLabel } from './Text/SubLabel'
import { IconButton } from './Button/IconButton'
import { Icon, icons } from './Icon'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask } from '../redux/actions/tasksActions'
import { Card } from './Card/Card'
import { Profile } from './Profile'

export const Task = ({task, showMore, setShowMore}) => {
  const { team } = useSelector(state => state.user)
  const {_id, title, createdAt, assignedTo, description, comments, deleteStatus } = task
  const tasks = useSelector(state => state.tasks)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const lastComment = comments[comments.length-1]

  const userLastComment = () => {
    const person = team.find(teammate => teammate.username == lastComment.author)
    return person
  }

  const handleDeleteTask = async () => {
    await dispatch(updateTask(_id, {deleteStatus: !deleteStatus}, token))
  } 

  return (
    <TaskCard status={'toDo'} key={_id}>
      <Label>{title.substring(0, 35)}</Label>
      <ContainerInfoTask>
        <SubLabel lowOpacity>{assignedTo}</SubLabel>
        <SubLabel priority lowPriority>
          bajo
        </SubLabel>
      </ContainerInfoTask>
      {_id !== showMore && (
        <IconButton onClick={() => setShowMore(_id)}>
          <Icon noText as={icons.arrowDown} white={'white'} />
        </IconButton>
      )}
      {_id === showMore && (
        <>
          <SubLabel> {description}</SubLabel>
          <SubLabel lowOpacity> Creado por aaaaaaaaaaa</SubLabel>
          <SubLabel lowOpacity>
            Inicio: {createdAt.split('T', 1)} | Finalización: 1232-13-12
          </SubLabel>
          <Line />
          <ContainerInfoTask>
            {comments?.length > 0 && (
              <>
                <CommentsSection>
                  <SubLabel>Comentarios</SubLabel>
                  <SubLabel button noUnderline lowOpacity>
                    <Icon mr='4' as={icons.plus} size='12' />
                    Añadir
                  </SubLabel>
                </CommentsSection>
                <Card comment>
                  <SubLabel>{lastComment.comment}</SubLabel>
                  <Profile
                    imageSize={16}
                    imagePath={userLastComment().profilePhoto}
                    subLabelText={lastComment.author}
                  />
                </Card>
              </>
            )}
            
          </ContainerInfoTask>
          <div>
            <SubLabel button noUnderline onClick={() => handleDeleteTask(_id)} lowOpacity>
              <Icon as={deleteStatus ? icons.restore : icons.edit} size='16' />
              {deleteStatus ? 'Restaurar tarea' : 'Editar tarea'}
            </SubLabel>
            <SubLabel button noUnderline onClick={() => handleDeleteTask(_id)} lowOpacity>
              <Icon as={icons.trash} size='16' />
              {deleteStatus ? 'Eliminar defenitivamente' : 'Eliminar tarea'}
            </SubLabel>
          </div>
          <IconButton onClick={() => setShowMore(null)}>
            <Icon noText as={icons.arrowUp} white={'white'} />
          </IconButton>
        </>
      )}
    </TaskCard>
  )
}

const ContainerInfoTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`

const CommentsSection = styled.div`
  display: flex;
  justify-content: space-between;
`

const Line = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  opacity: .5;
  color: ${p => p.theme.styles.colors.white};
  background-color: ${p => p.theme.styles.colors.white};
  margin: 16px 0;
`