import styled from 'styled-components'

export const BoxButton = styled.button`
  border: 0;
  outline: 0;
  padding: ${p => p.theme.styles.padding.medium};
  border-radius: ${p => p.theme.styles.borderRadius.medium};
  background-color: ${p => p.theme.styles.colors.white};
  cursor: pointer;
  
  label {
    cursor: pointer;
  }

  font-size: ${p => p.button && p.theme.styles.fontSize.small};
  color: ${p => p.button && p.theme.styles.colors.black};
  font-weight: ${ p => p.button && p.theme.styles.fontWeight.medium};
`