import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCiVHj0ndnzNQA8NEEiXjEEya1YZdK-8Fg",
    authDomain: "whatsapp-81913.firebaseapp.com",
    projectId: "whatsapp-81913",
    storageBucket: "whatsapp-81913.appspot.com",
    messagingSenderId: "1040427745735",
    appId: "1:1040427745735:web:6faf8ede7c23f1ce9ed9e2",
    measurementId: "G-Q0CYG2YG8C"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const db = app.firestore();
  
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export {auth, googleProvider};


  export default db;