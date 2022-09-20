import React from 'react'
import styled from 'styled-components'

export const Tasks = () => {
  // TODO: Al terminar eliminar pages/Component.jsx y también su ruta en App.jsx
  // TODO: Al terminar también hacer framer motion, olvidé mi contraseña, landing page
  // TODO: Crear hook para usar localstorage y setear theme.
  // TODO: Hacer el reducer y acción para consumir el endpoint update profile
  // TODO: Conectar formularios mediante dispatch
  // TODO: Actualizar diagramas

  const [section, setSection] = React.useState('TeamTasks')

  return (
    <>
      <Content>
        <TasksList>
          {section === 'TeamTasks' && 'Tareas del equipo'}
          {section === 'MyTasks' && 'Mis tareas'}
          {section === 'Trash' && 'Papelera'}
        </TasksList>
      </Content>
    </>
  )
}

const Content = styled.div`
  width: calc(100% - 344px);
  background-color: red;
  margin-left: 248px;
  padding: 48px;
  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    width: calc(100% - 64px);
    margin-left: 0;
    padding: 32px;
    padding-top: 96px;
  }
`

const TasksList = styled.div`
`