import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBpTd1iZ6EthdF1IXWGKXejzt6HMlTIhno",
    authDomain: "plantivoro.firebaseapp.com",
    projectId: "plantivoro",
    storageBucket: "plantivoro.appspot.com",
    messagingSenderId: "922770101247",
    appId: "1:922770101247:web:583b98711fd56b6a718dca",
    measurementId: "G-JM3RZZG52K"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();

export {auth, firebase, db}