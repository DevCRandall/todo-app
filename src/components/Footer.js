import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Footer() {
  const { currentUser } = useAuth()
  return (
    
    <footer className="bg-light text-center p-4 fixed-bottom">
      <strong>&copy; {new Date().getFullYear()} Chris Randall, All Rights Reserved</strong>
    </footer>
  )
}
