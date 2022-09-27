import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RedirectLogin = ({ children }) => {
  const { isSignedIn } = useSelector(state => state.user)
  const token = localStorage.getItem('token')

  if (isSignedIn && token) {
    return <Navigate to="/" replace={true} />
  }

  return children
}

export default RedirectLogin