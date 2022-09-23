import React from 'react'

import { Label } from '../Text/Label'
import { SubLabel } from '../Text/SubLabel'
import { Link } from 'react-router-dom'

export const TextButtonSmall = ( {to, children, error, sidebar, semiBold, lowOpacity, active, noUnderline, onClick} ) => {
  return(
    <Link to={to} onClick={onClick}>
      <Label sidebar={sidebar} button semiBold={semiBold} lowOpacity={lowOpacity} active={active} noUnderline={noUnderline}>
        {children}
      </Label>
      { error && <SubLabel error>{error}</SubLabel> }
    </Link>
  )
}