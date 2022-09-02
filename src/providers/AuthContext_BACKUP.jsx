import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    // return auth.signInWithEmailAndPassword(auth, email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function getUser() {
    return auth.currentUser
  }

  function isAdmin() {
    return auth.currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true
      } else {
        return false
      }
    })
  }

  // function isEditor() {
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    getUser,
    signIn,
    signOut,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}
