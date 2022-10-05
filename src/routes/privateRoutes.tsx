import { Props } from '@/interfaces/childProps.interface'
import { Navigate } from 'react-router-dom'
import React from 'react'
const PrivateRoute = ({ children }: Props) => {
  let user = localStorage.getItem('userInfo') || ''
  if (user) {
    return <>{children}</>
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    )
  }
}

export default PrivateRoute
