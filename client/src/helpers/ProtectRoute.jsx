import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children }) => {
  const signedIn = useSelector(state => state.user.isSignedIn)

  if (!signedIn) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}

export default ProtectRoute