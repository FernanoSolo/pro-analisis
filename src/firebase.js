import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCgDKIttyqVOZHvidpQQ10PAdvwXjFXbrk",
    authDomain: "analisi2-8d1bd.firebaseapp.com",
    databaseURL: "https://analisi2-8d1bd.firebaseio.com",
    projectId: "analisi2-8d1bd",
    storageBucket: "analisi2-8d1bd.appspot.com",
    messagingSenderId: "747192034156",
    appId: "1:747192034156:web:607739ff422a6b832f0949"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db, auth}