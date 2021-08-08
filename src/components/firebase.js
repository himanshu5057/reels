import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
firebase.initializeApp(
{
    apiKey: "AIzaSyD6phKi7uXaUs9FhTLLMDfOXRT4mSop_iI",
    authDomain: "reels-57a6c.firebaseapp.com",
    projectId: "reels-57a6c",
    storageBucket: "reels-57a6c.appspot.com",
    messagingSenderId: "290355702090",
    appId: "1:290355702090:web:c25b13e6d0c6392139b9b3",
    measurementId: "G-57E21T78KQ"
  });
export const auth = firebase.auth();
const firestore =firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection("posts"),
    comments:firestore.collection("comments"),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage();
