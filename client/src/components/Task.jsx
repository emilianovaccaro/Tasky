import React from 'react'
import styled from 'styled-components'
import { TaskCard } from './Card/TaskCard'
import { Label } from './Text/Label'
import { SubLabel } from './Text/SubLabel'
import { IconButton } from './Button/IconButton'
import { Icon, icons } from './Icon'

export const Task = ({task, showMore, setShowMore}) => {

  const {_id, title, createdAt, assignedTo, description } = task

  return (
    <TaskCard status={'toDo'} key={_id}>
      <Label>{title}</Label>
      <ContainerInfoTask>
        <SubLabel lowOpacity>{assignedTo}</SubLabel>
        <SubLabel priority lowPriority>
          Low Priority
        </SubLabel>
      </ContainerInfoTask>
      {_id !== showMore && (
        <IconButton onClick={() => setShowMore(_id)}>
          <Icon as={icons.arrowDown} white={'white'} />
        </IconButton>
      )}
      {_id === showMore && (
        <>
          <Label>{description}</Label>
          <SubLabel lowOpacity> Creado por aaaaaaaaaaa</SubLabel>
          <SubLabel lowOpacity>
            Inicio: {createdAt.split('T', 1)} | Finalizacion: 1232-13-12
          </SubLabel>
          <hr/>
          <ContainerInfoTask>
            <SubLabel> commentarios</SubLabel>
            <SubLabel lowOpacity>
              <Icon as={icons.plus} />
              Aniadir comentario
            </SubLabel>
          </ContainerInfoTask>
          <div>
            <SubLabel lowOpacity>
              <Icon as={icons.edit} />
              Editar Tarea
            </SubLabel>
            <SubLabel lowOpacity>
              <Icon as={icons.delete} />
              Eleminar Tarea
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
  justify-content: space-between;
  align-items: center;
`