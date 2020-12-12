import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCttZ96_rYxhJ028C4rMdyJzrK80-84r-I",
    authDomain: "ecom-merce.firebaseapp.com",
    projectId: "ecom-merce",
    storageBucket: "ecom-merce.appspot.com",
    messagingSenderId: "458753835144",
    appId: "1:458753835144:web:30e3356d7562da85901f3d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuth = new firebase.auth.GoogleAuthProvider();
  