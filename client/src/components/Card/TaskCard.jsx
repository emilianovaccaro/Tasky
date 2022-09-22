import React from 'react'
import styled from 'styled-components'

export const TaskCard = ( {children, status} ) => {
  return(
    <CardContainer status={status}>
      <CardChildren>
        {children}
      </CardChildren>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${({theme}) => theme.mode.tertiary}E0;
  border-left: 24px solid ${p => p.status === 'finished' ? p.theme.styles.colors.lightblue : p.status === 'inProgress' ? p.theme.styles.colors.yellow : p.status === 'toDo' && p.theme.styles.colors.green};
  padding: ${p => p.theme.styles.padding.medium};
`

const CardChildren = styled.div`
  display: flex;
  flex-direction: column;
`