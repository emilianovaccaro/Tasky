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
import { Spinner } from './Spinner'
import Collapse from 'react-css-collapse'
import Swal from 'sweetalert2'

export const Task = ({ task, toggleModal, setTaskProps, toggleComment }) => {
  const { team } = useSelector(state => state.user)
  const user = useSelector(state => state.user.user)
  const { _id, title, assignedTo, description, comments, deleteStatus, userId, priority, status } = task
  const [ showMore, setShowMore ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()  

  let lastComment 
  if ( comments.length > 0 ) {
    lastComment = comments[comments.length - 1]
  }

  const creator = team.find(teammate => teammate._id == userId )?.fullname
  const commentor = team.find(teammate => teammate.username == lastComment?.author)

  const handleDeleteTask = async () => {
    setLoading(true)
    try {
      await dispatch(updateTask(_id, {deleteStatus: !deleteStatus}, token))
      setLoading(false)
    } catch(error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: `Oops... Error: ${error?.response.status}`,
        text: `${error?.response?.data?.msg}`
      })
    }
  }

  const handleEditTask = (value) => {
    setTaskProps(task)
    if (value === 'formEdit') {
      toggleModal(true)
    }
    if (value === 'commentEdit') {
      toggleComment(true)
    }
  }

  const finishDeleting = async () => {
    setLoading(true)
    try {
      await dispatch(deleteTask(_id, token))
      setLoading(false)
    } catch(error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: `Oops... Error: ${error?.response.status}`,
        text: `${error?.response?.data?.msg}`
      })
    }
  }

  return (
    <TaskCard status={status} key={_id} >
      <Label titleLabel>{title}</Label>
      <ContainerInfoTask>
        <SubLabel lowOpacity>{assignedTo ? 'Asignada a ' : 'No asignada'}{assignedTo}</SubLabel>
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
      <ContainerInfo isOpen={showMore === _id || undefined}>
        <ContainerInfoTask>
          <SubLabel description>{description}</SubLabel>
        </ContainerInfoTask>
        <ContainerInfoTask>
          <SubLabel lowOpacity>Creada por {creator}</SubLabel>
        </ContainerInfoTask>
        <Line />
        <>
          {(comments.length > 0) && (
            <>
              <ContainerInfoTask marginBottom>
                <SubLabel>Último comentario</SubLabel>
              </ContainerInfoTask>
              <>
                <Card comment>
                  <SubLabel>{lastComment.comment || undefined}</SubLabel>
                  <Profile
                    imageSize={16}
                    imagePath={commentor?.profilePhoto || undefined}
                    subLabelText={commentor?.fullname || lastComment.author}
                  />
                </Card>
              </>
            </>
          )}
        </>
        { ! loading ? (
          <ActionButtons>
            {!deleteStatus ? (
              <SubLabel button noUnderline 
                onClick={!deleteStatus ? () => handleEditTask('commentEdit') : <></>} lowOpacity
              >
                <Icon mr='8' as={icons.plus} size='16' />
                Añadir comentario                  </SubLabel>
            ) : <></>}
            <SubLabel button noUnderline onClick={deleteStatus ? () => handleDeleteTask(_id) : () => handleEditTask('formEdit')} lowOpacity>
              <Icon mr='8' as={deleteStatus ? icons.restore : icons.edit} size='16' />
              {deleteStatus ? 'Restaurar' : 'Editar'}
            </SubLabel>
            {
              !deleteStatus ? 
                <SubLabel button noUnderline 
                  onClick={() => handleDeleteTask(_id)} lowOpacity
                >
                  <Icon mr='8' as={icons.trash} size='16' />
                  {'Enviar a papelera'}
                </SubLabel>
                : (deleteStatus && (user._id == userId || user.isAdmin == true)) ? 
                  <SubLabel button noUnderline 
                    onClick={() => finishDeleting()} lowOpacity
                  >
                    <Icon mr='8' as={icons.trash} size='16' />
                    {'Eliminar definitivamente'}
                  </SubLabel> : <></>
            }
          </ActionButtons> 
        ) : (
          <Spinner variant/>
        )}
        <ContainerInfoTask center={'center'}>
          <IconButton onClick={() => setShowMore(null)}>
            <Icon as={icons.arrowUp} white={'white'} />
          </IconButton>
        </ContainerInfoTask>
      </ContainerInfo>
    </TaskCard>
  )
}

const ContainerInfoTask = styled.div`
  display: flex;
  gap: 8px;
  justify-content: ${p => p.center ? 'center' : 'space-between'};
  width: 100%;
  align-items: center;
  margin: 5px 0 ;
  margin: ${p => p.marginBottom && '5px 0 10px 0'};
`

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
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

const ContainerInfo = styled(Collapse)`
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
`