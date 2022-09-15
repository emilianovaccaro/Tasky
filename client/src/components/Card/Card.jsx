import React from 'react'
import styled from 'styled-components'
import { SubTitle } from '../Text/SubTitle'

export const Card = ( {children, headerChildren, SubTitleText, defaultColor} ) => {
  return(
    <CardContainer defaultColor={defaultColor}>
      {
        headerChildren ?
          <CardHeader defaultColor={defaultColor}>
            {headerChildren}
          </CardHeader> :
          <SubTitle marginBottom={'12px'}>{SubTitleText}</SubTitle>
      }
      {children}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  padding: ${p => p.theme.styles.padding.large};
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${({theme}) => theme.mode.primary};
  background-color: ${p => p.defaultColor && p.theme.styles.colors.primaryDark};
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -24px;
  margin-left: -32px;
  margin-bottom: 12px;
  padding: ${p => p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium} ${p => p.theme.styles.borderRadius.medium} 0 0 ;
  background-color: ${({theme}) => theme.mode.secondary};
  background-color: ${p => p.defaultColor && p.theme.styles.colors.white};
`