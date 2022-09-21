import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children }) => {
  const { isSignedIn } = useSelector(state => state.user)

  if (!isSignedIn) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}

export default ProtectRoute