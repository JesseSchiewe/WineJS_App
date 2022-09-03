import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider
} from "firebase/auth";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    apiKey: "AIzaSyB2yTPOk9y8C4hWu_x8crC8q3Sqbu6R44I",
    authDomain: "winejs-db.firebaseapp.com",
    databaseURL: "https://winejs-db.firebaseio.com",
    projectId: "winejs-db",
    storageBucket: "winejs-db.appspot.com",
    messagingSenderId: "890771190455",
    appId: "1:890771190455:web:7f52cb240e4e4b9ab29332",
    measurementId: "G-6HWXZH3Y84"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
// console.log(auth);

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    signInWithRedirect(auth, googleProvider);
  }

  function signOut() {
    return signOut();
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(email, password);
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
    signUp,
    signInWithGoogle,
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}
