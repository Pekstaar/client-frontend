import firebase from "firebase/app";
import "firebase/auth";
// import React from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQem4ACll5t_B-3kib7cvjhxr4jjxCNWM",
  authDomain: "ecommerce-e6f9e.firebaseapp.com",
  projectId: "ecommerce-e6f9e",
  storageBucket: "ecommerce-e6f9e.appspot.com",
  messagingSenderId: "40375210512",
  appId: "1:40375210512:web:01f418107fa11657c5f095",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authentication = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
