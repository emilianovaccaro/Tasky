import styled from 'styled-components'

export const Title = styled.h1`
  line-height: 46px;
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.big};
  font-size: ${p => p.extraBig && p.theme.styles.fontSize.extraBig};
  font-weight: ${({theme}) => theme.styles.fontWeight.big};
  
  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    font-size: ${({theme}) => theme.styles.fontSize.medium};
    font-size: ${p => p.extraBig && p.theme.styles.fontSize.extraBig};
  }
`