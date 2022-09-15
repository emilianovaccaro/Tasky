import styled from 'styled-components'

export const SubTitle = styled.h3`
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.medium};
  font-weight: ${({theme}) => theme.styles.fontWeight.semiBold};
  
  opacity: ${p => p.lowOpacity && '50%'};
  text-decoration: ${p => p.button && 'underline'};
  cursor: ${p => p.button && 'pointer'};
  display: ${p => p.icon && 'inline-block'};
  margin-bottom: ${p => p.marginBottom};
`