import React from 'react'

import { SubTitle } from '../Text/SubTitle'
import { Link } from 'react-router-dom'

export const TextButtonMedium = ( {to, children, lowOpacity} ) => {
  return(
    <Link to={to}>
      <SubTitle button lowOpacity={lowOpacity}>
        {children}
      </SubTitle>
    </Link>
  )
}