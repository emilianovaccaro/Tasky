import styled from 'styled-components'

export const BoxButton = styled.button`
  border: 0;
  outline: 0;
  padding: ${p => p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${p => p.theme.styles.colors.white};
  cursor: pointer;
`