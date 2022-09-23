import React, { useState } from 'react'
import styled from 'styled-components'
import { TaskCard } from './Card/TaskCard'
import { Label } from './Text/Label'
import { SubLabel } from './Text/SubLabel'
import { IconButton } from './Button/IconButton'
import { Icon, icons } from './Icon'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, updateTask } from '../redux/actions/tasksActions'
import { Card } from './Card/Card'
import { Profile } from './Profile'

export const Task = ({task}) => {
  const { team } = useSelector(state => state.user)

  const {_id, title, assignedTo, description, comments, deleteStatus, userId, priority, status } = task
  const [showMore, setShowMore] = useState(null)

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()  

  let lastComment 
  if ( comments.length > 0 ) {
    lastComment = comments[comments.length - 1]
  }

  const creator = team.find(teammate => teammate._id == userId )?.username
  const commentor = team.find(teammate => teammate.username == lastComment?.author)

  const handleDeleteTask = async () => {
    try {
      return await dispatch(updateTask(_id, {deleteStatus: !deleteStatus}, token))
    } catch(error) {
      return console.log(error)
    }
  }

  const finishDeleting = async () => {
    try {
      return await dispatch(deleteTask(_id, token))
    } catch(error) {
      return console.log(error)
    }
  }

  return (
    <TaskCard status={status} key={_id}>
      <Label>{title.substring(0, 32)}</Label>
      <ContainerInfoTask>
        <SubLabel lowOpacity>Asignada a {assignedTo}</SubLabel>
        <SubLabel priority lowPriority={priority === 'low'} mediumPriority={priority === 'medium'} highPriority={priority === 'high'}>
          {priority === 'low' && 'baja'}
          {priority === 'medium' && 'media'}
          {priority === 'high' && 'alta'}
        </SubLabel>
      </ContainerInfoTask>
      {_id !== showMore && (
        <IconButton onClick={() => setShowMore(_id)}>
          <Icon as={icons.arrowDown} white={'white'} />
        </IconButton>
      )}
      {_id === showMore && (
        <>
          <ContainerInfoTask>
            <SubLabel> {description}</SubLabel>
          </ContainerInfoTask>
          <ContainerInfoTask>
            <SubLabel lowOpacity>Creada por {creator}</SubLabel>
          </ContainerInfoTask>
          <Line />
          <>
            {(comments.length > 0) && (
              <>
                <ContainerInfoTask marginBottom>
                  <SubLabel>Comentarios</SubLabel>
                  {
                    !deleteStatus && 
                    <SubLabel button noUnderline lowOpacity>
                      <Icon mr='4' as={icons.plus} size='12' />
                        Añadir
                    </SubLabel>
                  }
                </ContainerInfoTask>
                <>
                  <Card comment>
                    <SubLabel>{lastComment.comment || false}</SubLabel>
                    <Profile
                      imageSize={16}
                      imagePath={commentor.profilePhoto || false}
                      subLabelText={commentor.fullname || lastComment.author}
                    />
                  </Card>
                </>
              </>
            )}

          </>
          <ActionButtons>
            <SubLabel button noUnderline onClick={() => handleDeleteTask(_id)} lowOpacity>
              <Icon mr='8' as={deleteStatus ? icons.restore : icons.edit} size='16' />
              {deleteStatus ? 'Restaurar' : 'Editar'}
            </SubLabel>
            <SubLabel button noUnderline 
              onClick={deleteStatus ? () => finishDeleting(_id) : () => handleDeleteTask(_id)} lowOpacity
            >
              <Icon mr='8' as={icons.trash} size='16' />
              {deleteStatus ? 'Eliminar definitivamente' : 'Enviar a papelera'}

            </SubLabel>
          </ActionButtons>
          <IconButton onClick={() => setShowMore(null)}>
            <Icon as={icons.arrowUp} white={'white'} />
          </IconButton>
        </>
      )}
    </TaskCard>
  )
}

const ContainerInfoTask = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 5px 0 ;
  margin: ${p => p.marginBottom && '5px 0 10px 0'};
`

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
`

const Line = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  opacity: .5;
  color: ${p => p.theme.styles.colors.white};
  background-color: ${p => p.theme.styles.colors.white};
  
`