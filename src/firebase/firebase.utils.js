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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // get the user documentRef object from signing into google via firestore query
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // this gives us a snapshot query
  const snapShot = await userRef.get();
  // use the exist property off of snapshot to tell if a user exist in our firestore db
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    // gives us current date
    const createdAt = new Date();
    // userRef is a documentRef obj which has properties that allows you to make CRUD operations like get, set, delete, update
    // set the new user in our firestore db
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((object) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });
  return await batch.commit();
};

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
