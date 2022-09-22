import styled from 'styled-components'

export const Label = styled.label`
  display: inline-block;
  margin-bottom: ${p => p.marginBottom};
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.small};
  
  text-align: ${p => p.center && 'center'};
  line-height: ${p => p.paragraph && '20px'};
  opacity: ${p => p.lowOpacity && '50%'};
  opacity: ${p => p.active && '100%'};
  color: ${p => p.black && p.theme.styles.colors.black};
  font-weight: ${ p => p.medium && p.theme.styles.fontWeight.medium};
  font-weight: ${ p => p.semiBold && p.theme.styles.fontWeight.semiBold};
  text-decoration: ${p => p.button && 'underline'};
  text-decoration: ${p => p.noUnderline && 'none'}!important;
  cursor: ${p => p.button && 'pointer'};
  transition: .15s;

  &:hover {
    opacity: ${p => p.button && '100%'};
  }
`