import styled, { css } from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

export const icons = {
  eye: AiOutlineEye,
  eyeCross: AiOutlineEyeInvisible,
  task: MdOutlineTaskAlt,
  trash: BsTrash,
}

export const Icon = styled.svg`
  color: inherit;
  overflow: visible;
  cursor: pointer;
  vertical-align: middle;
  ${p => getSize(p)}
  
  color: ${p => p.white && p.theme.styles.colors.white};
`

const getSize = ({ size = 24 }) => css`
  height: ${size}px;
  width: ${size}px;
`