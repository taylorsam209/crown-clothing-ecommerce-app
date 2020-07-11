import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB6eq3kDx6jMUiMr2wc1GPfUmXcSWic4H8",
  authDomain: "crwn-db-16e04.firebaseapp.com",
  databaseURL: "https://crwn-db-16e04.firebaseio.com",
  projectId: "crwn-db-16e04",
  storageBucket: "crwn-db-16e04.appspot.com",
  messagingSenderId: "11860841991",
  appId: "1:11860841991:web:a31ca72cf4e9c499fa3ca2",
  measurementId: "G-N5QLQDV94E",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
