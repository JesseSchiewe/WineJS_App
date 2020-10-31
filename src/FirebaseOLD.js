//import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    //auth.signInWithPopup(provider);
    auth.signInWithRedirect(provider);
    //auth.signInWithCredential(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

const getUserDocument = async uid => {
    if (!uid) return null;
        try {
            const userDocument = await firestore.doc(`users/${uid}`).get();
            return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};


//const FirebaseContext = React.createContext(null);
//export default FirebaseContext