import styled from 'styled-components'

export const SubLabel = styled.label`
  color: ${({theme}) => theme.styles.colors.white};
  font-size: ${({theme}) => theme.styles.fontSize.extraSmall};
  
  opacity: ${p => p.lowOpacity && '50%'};
  text-decoration: ${p => p.button && 'underline'};
  cursor: ${p => p.button && 'pointer'};
  font-weight: ${p => p.priority && p.theme.styles.fontWeight.semiBold};
  padding: ${p => p.priority && p.theme.styles.padding.small};
  border-radius: ${p => p.priority && p.theme.styles.borderRadius.large};
  background-color: ${p => p.lowPriority && p.theme.styles.colors.lowPriority};
  background-color: ${p => p.mediumPriority && p.theme.styles.colors.mediumPriority};
  background-color: ${p => p.highPriority && p.theme.styles.colors.highPriority};
  color: ${p => p.error && p.theme.styles.colors.red};
  margin-top: ${p => p.error && '8px'};
  margin-bottom: ${p => p.error && '8px'};
`