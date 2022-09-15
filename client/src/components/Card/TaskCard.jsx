import React from 'react'
import styled from 'styled-components'

export const TaskCard = ( {children} ) => {
  return(
    <CardContainer>
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
  background-color: ${({theme}) => theme.mode.tertiary};
  border-left: 32px solid ${p => p.theme.styles.colors.lightblue};
  padding: ${p => p.theme.styles.padding.large};
`

const CardChildren = styled.div`
  display: flex;
  flex-direction: column;
`