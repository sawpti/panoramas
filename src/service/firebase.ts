import * as  firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyCiPodkku0m2ZWjkSCDy0Za7f98GlXe3kY",
    appId: "1:604781351481:web:b362bcd7f5397e358173e8",
    authDomain: "app-panoramas.firebaseapp.com",
    databaseURL: "https://app-panoramas.firebaseio.com",
    measurementId: "G-Z0DPEGS4GE",
    messagingSenderId: "604781351481",
    projectId: "app-panoramas",
    storageBucket: "app-panoramas.appspot.com",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)


   // const firestore = firebase.firestore()
  //  const settings = {timestampsInSnapshots: true}
   //     irestore.settings(settings) 

  export const auth = firebase.auth()
 //  export const db = firestore
  export const db = firebase.firestore()
  export const storage = firebase.storage()
  
  

