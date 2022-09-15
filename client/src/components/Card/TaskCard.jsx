import React from 'react'
import styled from 'styled-components'

export const TaskCard = ( {children, defaultColor} ) => {
  return(
    <CardContainer defaultColor={defaultColor}>
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
  border-left: 50px solid blue;
  padding: 20px;
`

const CardChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`