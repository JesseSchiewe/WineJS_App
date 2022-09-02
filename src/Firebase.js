// Firebase v9 compatible method
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

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
// export const db = getFirestore(app);
export const firestore = getFirestore(app);
// export const auth = getAuth(app);
export const auth = getAuth(app);

console.log(auth);


// firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const firestore = firebaseApp.firestore();
// export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//     //auth.signInWithPopup(provider);
//     auth.signInWithRedirect(provider);
//     //auth.signInWithCredential(provider);
// };

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;
//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();
//   if (!snapshot.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async uid => {
//   if (!uid) return null;
//     try {
//       const userDocument = await firestore.doc(`users/${uid}`).get();
//       return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };
