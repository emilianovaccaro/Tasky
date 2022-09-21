import styled from 'styled-components'

export const Content = styled.div`
  width: calc(100% - 344px);
  background-color: red;
  margin-left: 248px;
  padding: 48px;
  @media screen and (max-width: ${p => p.theme.styles.breakpoints.medium}) {
    width: calc(100% - 64px);
    margin-left: 0;
    padding: 32px;
    padding-top: 96px;
  }
`