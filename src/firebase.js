import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB7bv7OfBvCX4vcduxopO5a7eoE7HzVrXE",
  authDomain: "calculator-84453.firebaseapp.com",
  databaseURL: "https://calculator-84453.firebaseio.com",
  projectId: "calculator-84453",
  storageBucket: "calculator-84453.appspot.com",
  messagingSenderId: "961095756034",
  appId: "1:961095756034:web:80d288855b3e05e52dba1b",
});

const fireStoreDB = firebaseApp.firestore();

export { fireStoreDB };
