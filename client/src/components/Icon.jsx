import styled, { css } from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineTeam, AiOutlinePlus, AiOutlineMail } from 'react-icons/ai'
import { MdOutlineTaskAlt, MdKeyboardBackspace, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { BsTrash, BsListUl, BsPerson, BsTelephone, BsCodeSlash } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { IoLogOutOutline } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
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
  arrowUp: RiArrowUpSLine,
  plus: AiOutlinePlus,
  phone: BsTelephone,
  email: AiOutlineMail,
  role: BsCodeSlash,
  restore: MdOutlineSettingsBackupRestore,
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