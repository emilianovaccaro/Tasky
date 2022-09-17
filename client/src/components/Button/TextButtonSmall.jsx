import React from 'react'

import { Label } from '../Text/Label'
import { Link } from 'react-router-dom'

export const TextButtonSmall = ( {to, children, error, semiBold, noUnderline} ) => {
  return(
    <Link to={to}>
      <Label button semiBold={semiBold} noUnderline={noUnderline}>
        {children}
      </Label>
      { error && <Label error>{error}</Label> }
    </Link>
  )
}