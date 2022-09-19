import React from 'react'

import { Label } from '../Text/Label'
import { SubLabel } from '../Text/SubLabel'
import { Link } from 'react-router-dom'

export const TextButtonSmall = ( {to, children, error, semiBold, lowOpacity, active, noUnderline} ) => {
  return(
    <Link to={to}>
      <Label button semiBold={semiBold} lowOpacity={lowOpacity} active={active} noUnderline={noUnderline}>
        {children}
      </Label>
      { error && <SubLabel error>{error}</SubLabel> }
    </Link>
  )
}