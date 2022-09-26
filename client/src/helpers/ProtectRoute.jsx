import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children }) => {
  const { isSignedIn } = useSelector(state => state.user)
  const token = localStorage.getItem('token')

  if (!isSignedIn || !token) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}

export default ProtectRoute