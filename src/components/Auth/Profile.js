import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile() {
  const { currentUser } = useAuth()
  return (
    <span className='profile p-2'>
      {/* Hello { !currentUser.displayName ? currentUser.email : currentUser.displayName }! */}
      <img src={currentUser.photoURL} alt={currentUser.displayName} />
    </span>
  )
}
