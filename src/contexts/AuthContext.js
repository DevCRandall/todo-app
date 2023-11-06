import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { auth } from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// Create context for all auth info
const AuthContext = React.createContext()

// Create a funtion that will allow us to use the context component. Will be imported anywhere we need the currentUser, Login or Logout
export function useAuth() {
  return useContext(AuthContext)
}

// Will provide AuthContext info to chilidren components nested inside.
// App.js is where we call to an instanve of this component and nest all other components.
export default function AuthProvider({children}) {
  // Hook below stores currentUser
  const [currentUser, setCurrentUser] = useState()
  // Second hook is a custome hook that determines if user has finished logging in so then we can display relevant children
  const [loading, setLoading] = useState(true)

  // Login functionality
  // Instantiate GithubAuthProvider object
  const githubAuthProvider = new GithubAuthProvider()

  // Build Login Function
  async function login() {
    return (signInWithPopup(auth, githubAuthProvider).then(authData => {
      console.log(authData)
      setCurrentUser(authData.user)
    }))
  }

  async function logout() {
    signOut(auth).then(setCurrentUser(null))  
  }

  // Object below holds currentUser info and login/logout functions so they can be used for child components
  const value = { currentUser, login, logout }

  useEffect(() => {
    const authChange = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return authChange

  }, []);

  return (
    <AuthContext.Provider value={value}>
      {/* Below waiting for authContext to populate before loading child components in the UI */}
      { !loading && children }
    </AuthContext.Provider>
  )
}
