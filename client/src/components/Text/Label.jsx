import styled from 'styled-components'

export const Label = styled.label`
  display: inline-block;
  margin-bottom: ${p => p.marginBottom};
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.small};
  
  opacity: ${p => p.lowOpacity && '50%'};
  color: ${p => p.black && p.theme.styles.colors.black};
  font-weight: ${ p => p.medium && p.theme.styles.fontWeight.medium};
  font-weight: ${ p => p.semiBold && p.theme.styles.fontWeight.semiBold};
  text-decoration: ${p => p.button && 'underline'};
  text-decoration: ${p => p.noUnderline && 'none'}!important;
  cursor: ${p => p.button && 'pointer'};
  color: ${p => p.error && p.theme.styles.colors.red};
  margin-left: ${p => p.error && '16px'};
`