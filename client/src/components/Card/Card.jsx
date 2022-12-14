import React from 'react'
import styled from 'styled-components'

export const Card = ( {children, headerChildren, inputs, multipleInputs, defaultColor, comment, tasks, tasksContent, modal } ) => {
  return(
    <CardContainer modal={modal} tasks={tasks} inputs={inputs} multipleInputs={multipleInputs} defaultColor={defaultColor} comment={comment}>
      {
        headerChildren &&
          <CardHeader tasksContent={tasksContent} defaultColor={defaultColor}>
            {headerChildren}
          </CardHeader>
      }
      <CardContent comment={comment} tasksContent={tasksContent}>
        {children}
      </CardContent>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  gap: ${p => p.comment && '12px'};
  width: ${p => p.inputs ? '78%' : 'unset'};
  width: ${p => p.tasks && '100%'};
  max-height: ${p => p.tasks && '74vh'};
  max-width: ${p => p.inputs && '384px'};
  max-width: ${p => p.multipleInputs && '788px'};
  max-width: ${p => p.modal && '512px'};
  padding: ${p => p.theme.styles.padding.large};
  padding: ${p => p.comment && '12px'};
  padding-right: ${p => p.tasks && '0'};
  padding-left: ${p => p.tasks && '0'};
  padding-bottom: ${p => p.tasks && '0'};
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${({theme}) => theme.mode.primary};
  background-color: ${p => p.defaultColor && p.theme.mode.primary}E0;
  background-color: ${p => p.comment && p.theme.mode.alternative}E0;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${p => p.tasksContent && p.theme.styles.padding.medium};
  gap: 24px;
  gap: ${p => p.comment && '12px'};
  line-height: ${p => p.comment && '16px'};
  text-overflow: ${p => p.comment && 'ellipsis'};
  overflow: ${p => p.comment && 'hidden'};
  max-width: ${p => p.comment && '180px'};
  overflow-x: ${p => p.tasksContent && 'hidden'};
  margin-top: ${p => p.tasksContent && '-24px'};
  padding-top: ${p => p.tasksContent && '16px'};
  padding-bottom: ${p => p.tasksContent && '16px'};

  @media screen and (max-width: ${p => p.theme.styles.breakpoints.large}) {
    padding: ${p => p.tasksContent && '16px'};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.tasksContent ? 'calc(100% - 64px)' : '100%'};
  margin-top: -24px;
  margin-left: ${p => p.tasksContent ? '0' : '-32px'};
  padding: ${p => p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium} ${p => p.theme.styles.borderRadius.medium} 0 0 ;
  background-color: ${({theme}) => theme.mode.secondary};
  background-color: ${p => p.defaultColor && p.theme.styles.colors.white};
`