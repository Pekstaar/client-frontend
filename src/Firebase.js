import firebase from "firebase/app";
import "firebase/auth";
// import React from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCttZ96_rYxhJ028C4rMdyJzrK80-84r-I",
  authDomain: "ecom-merce.firebaseapp.com",
  projectId: "ecom-merce",
  storageBucket: "ecom-merce.appspot.com",
  messagingSenderId: "458753835144",
  appId: "1:458753835144:web:30e3356d7562da85901f3d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authentication = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
