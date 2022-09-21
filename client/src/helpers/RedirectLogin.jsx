import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RedirectLogin = ({ children }) => {
  const { isSignedIn } = useSelector(state => state.user)

  if (isSignedIn) {
    return <Navigate to="/" replace={true} />
  }

  return children
}

export default RedirectLogin