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