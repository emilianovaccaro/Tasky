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
  border-left: 32px solid ${p => p.status === 'finished' ? p.theme.styles.colors.lightblue : p.status === 'inProgress' ? p.theme.styles.colors.yellow : p.theme.styles.colors.green};
  padding: ${p => p.theme.styles.padding.intermediate};
  
  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    border-left: 24px solid ${p => p.status === 'finished' ? p.theme.styles.colors.lightblue : p.status === 'inProgress' ? p.theme.styles.colors.yellow : p.theme.styles.colors.green};
  }
`

const CardChildren = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
`