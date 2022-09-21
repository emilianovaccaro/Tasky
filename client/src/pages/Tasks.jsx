import React from 'react'
import styled from 'styled-components'
import { Content } from '../components/Content'
import { Title } from '../components/Text/Title'

export const Tasks = ( {section}) => {
  // TODO: Al terminar eliminar pages/Component.jsx y también su ruta en App.jsx
  // TODO: Al terminar también hacer framer motion, olvidé mi contraseña, landing page
  // TODO: Crear hook para usar localstorage y setear theme.
  // TODO: Hacer el reducer y acción para consumir el endpoint update profile
  // TODO: Conectar formularios mediante dispatch
  // TODO: Actualizar diagramas
  // TODO: Hacer el arrastrador de tareas de una columna a otra (y ver cómo lo resolvemos en mobile)
  // TODO: Ajustamos los colores de los temas para que los 3 se vean bien
  // TODO: Hacer que se cierre el menu en mobile después de haber apretado un link
  // TODO: Queda pendiente terminar la obtención del usuario en el sidebar

  return (
    <>
      <Content>
        <TasksList>
          {!section && <Title>Tareas</Title>}
          {section === 'assigned' && <Title>Mis tareas asignadas</Title>}
          {section === 'trash' && <Title>Papelera</Title>}
        </TasksList>
      </Content>
    </>
  )
}

const TasksList = styled.div`
`