import styled from 'styled-components'

export const Label = styled.h4`
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.small};
  
  font-weight: ${ p => p.semiBold && p.theme.styles.fontWeight.semiBold};
  text-decoration: ${p => p.button && 'underline'};
  cursor: ${p => p.button && 'pointer'};
  display: ${p => p.icon && 'inline-block'};
`