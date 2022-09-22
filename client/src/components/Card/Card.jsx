import React from 'react'
import styled from 'styled-components'

export const Card = ( {children, headerChildren, inputs, multipleInputs, defaultColor, comment, tasks, tasksContent } ) => {
  return(
    <CardContainer tasks={tasks} inputs={inputs} multipleInputs={multipleInputs} defaultColor={defaultColor} comment={comment}>
      {
        headerChildren &&
          <CardHeader defaultColor={defaultColor}>
            {headerChildren}
          </CardHeader>
      }
      <CardContent tasksContent={tasksContent}>
        {children}
      </CardContent>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: ${p => p.inputs ? '78%' : 'unset'};
  width: ${p => p.tasks && '100%'};
  max-height: ${p => p.tasks && '50vh'};
  max-width: ${p => p.inputs && '384px'};
  max-width: ${p => p.multipleInputs && '788px'};
  padding: ${p => p.theme.styles.padding.large};
  padding: ${p => p.comment && p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${({theme}) => theme.mode.primary}E0;
  background-color: ${p => p.defaultColor && p.theme.mode.primary}E0;
  background-color: ${p => p.comment && p.theme.mode.alternative}E0;
`

const CardContent = styled.div`
  overflow-y: ${p => p.tasksContent && 'scroll'};
  overflow-x: ${p => p.tasksContent && 'hidden'};
  background-color: red;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -24px;
  margin-left: -32px;
  padding: ${p => p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium} ${p => p.theme.styles.borderRadius.medium} 0 0 ;
  background-color: ${({theme}) => theme.mode.secondary};
  background-color: ${p => p.defaultColor && p.theme.styles.colors.white};
`