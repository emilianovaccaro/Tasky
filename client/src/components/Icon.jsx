import styled, { css } from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineTeam, AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineTaskAlt, MdKeyboardBackspace } from 'react-icons/md'
import { BsTrash, BsListUl, BsPerson } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { IoLogOutOutline } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiArrowDownSLine, RiArrowUpSLine, RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit2 } from 'react-icons/fi'

export const icons = {
  eye: AiOutlineEye,
  eyeCross: AiOutlineEyeInvisible,
  task: MdOutlineTaskAlt,
  trash: BsTrash,
  team: AiOutlineTeam,
  settings: FiSettings,
  logOut: IoLogOutOutline,
  back: MdKeyboardBackspace,
  hamburgerMenu: GiHamburgerMenu,
  allTasks: BsListUl,
  assigned: BsPerson,
  arrowDown: RiArrowDownSLine,
  edit: FiEdit2,
  delete: RiDeleteBin5Line,
  arrowUp: RiArrowUpSLine,
  plus: AiOutlinePlus,
}

export const Icon = styled.svg`
  color: inherit;
  overflow: visible;
  cursor: pointer;
  vertical-align: middle;
  margin-right: ${p => p.mr}px;
  ${p => getSize(p)}
  
  color: ${p => p.white && p.theme.styles.colors.white};
`

const getSize = ({ size = 24 }) => css`
  height: ${size}px;
  width: ${size}px;
`