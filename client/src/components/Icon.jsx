import styled, { css } from 'styled-components'
import { AiOutlineInstagram } from 'react-icons/ai'

export const icons = {
  instagram: AiOutlineInstagram,
}

export const Icon = styled.svg`
  color: inherit;
  overflow: visible;
  cursor: pointer;
  vertical-align: middle;
  ${p => getSize(p)}
`

const getSize = ({ size = 24 }) => css`
  height: ${size}px;
  width: ${size}px;
`