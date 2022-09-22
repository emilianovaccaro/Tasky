import React, { useState } from 'react'
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
  const {_id, title, createdAt, assignedTo, description, comments, deleteStatus, userId } = task
  const [ taskDeleteStat, setTaskDeleteStat ] = useState(deleteStatus)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()  


  let lastComment = []
  if ( comments.length > 0 ) {
    lastComment = comments[comments.length - 1]
  }
  const creator = team.find(teammate => teammate._id == userId )?.username
  const commentor = team.find(teammate => teammate.username == lastComment?.author)


  const handleDeleteTask = async () => {
    setTaskDeleteStat(!taskDeleteStat)
    try {
      return await dispatch(updateTask(_id, {deleteStatus: taskDeleteStat}, token))
    } catch(error) {
      return console.log(error)
    }
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
          <Icon as={icons.arrowDown} white={'white'} />
        </IconButton>
      )}
      {_id === showMore && (
        <>
          <SubLabel> {description}</SubLabel>
          <SubLabel lowOpacity>{creator}</SubLabel>
          <SubLabel lowOpacity>
            Inicio: {createdAt.split('T', 1)} | Finalización: 1232-13-12
          </SubLabel>
          <Line />
          <ContainerInfoTask>
            {(comments.length > 0) && (
              <>
                <CommentsSection>
                  <SubLabel>Comentarios</SubLabel>
                  <SubLabel button noUnderline lowOpacity>
                    <Icon mr='4' as={icons.plus} size='12' />
                    Añadir
                  </SubLabel>
                </CommentsSection>
                <Card comment>
                  <SubLabel>{lastComment.comment || false}</SubLabel>
                  <Profile
                    imageSize={16}
                    imagePath={commentor.profilePhoto || false}
                    subLabelText={commentor.fullname || lastComment.author}
                  />
                </Card>
              </>
            )}
            
          </ContainerInfoTask>
          <div>
            <SubLabel button noUnderline onClick={() => handleDeleteTask()} lowOpacity>
              <Icon as={deleteStatus ? icons.restore : icons.edit} size='16' />
              {deleteStatus ? 'Restaurar tarea' : 'Editar tarea'}
            </SubLabel>
            <SubLabel button noUnderline onClick={() => handleDeleteTask()} lowOpacity>
              <Icon as={icons.trash} size='16' />
              {deleteStatus ? 'Eliminar defenitivamente' : 'Eliminar tarea'}
            </SubLabel>
          </div>
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