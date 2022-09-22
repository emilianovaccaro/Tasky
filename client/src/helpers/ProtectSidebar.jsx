import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { useSelector } from 'react-redux'

const ProtectSidebar = () => {
  const { isSignedIn } = useSelector(state => state.user)

  if ( !isSignedIn ) {
    return <></>
  }
  
  return (
    <Sidebar />
  )
}

export default ProtectSidebar