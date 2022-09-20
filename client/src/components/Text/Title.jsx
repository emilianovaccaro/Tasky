import styled from 'styled-components'

export const Title = styled.h1`
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.big};
  font-size: ${p => p.extraBig && p.theme.styles.fontSize.extraBig};
  font-weight: ${({theme}) => theme.styles.fontWeight.bold}
`