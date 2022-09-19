import React from 'react'

import { SubLabel } from '../Text/SubLabel'
import { Link } from 'react-router-dom'

export const TextButtonExtraSmall = ( {to, children} ) => {
  return(
    <Link to={to}>
      <SubLabel button>
        {children}
      </SubLabel>
    </Link>
  )
}