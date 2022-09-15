import React from 'react'
import styled from 'styled-components'

export const TaskCard = ( {children, defaultColor} ) => {
  return(
    <CardContainer defaultColor={defaultColor}>
      <SideColor />
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
`

const SideColor = styled.div`
  border-radius: ${p => p.theme.styles.borderRadius.medium} 0 0 ${p => p.theme.styles.borderRadius.medium};
  background-color: red;
  height: 100%;
`

const CardChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`