import firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID
});

const db = firebase.firestore();

export default db;
///    apiKey: "AIzaSyCgj4ixMcBf3GkAKxEgc9nl3io8g0nVGEI",
//     authDomain: "testing-fb-server.firebaseapp.com",
//     databaseURL: "https://testing-fb-server-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "testing-fb-server",
//     storageBucket: "testing-fb-server.appspot.com",
//     messagingSenderId: "14880288862",
//     appId: "1:14880288862:web:b6c15979007775b8b2c4cf",
//     measurementId: "G-8KK072PRG9"