
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs,query, where,doc, setDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import {getDownloadURL} from 'firebase/storage';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBpINUQqzMYzKhq44yvkWCtndmDfEmrqSQ",
  authDomain: "my-pet-app-f08b4.firebaseapp.com",
  projectId: "my-pet-app-f08b4",
  storageBucket: "my-pet-app-f08b4.appspot.com",
  messagingSenderId: "547788531006",
  appId: "1:547788531006:web:106b2d0c6a1a8b4737386f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {app, db, collection, addDoc, getFirestore, getDocs, query, where, firebase,doc, setDoc,getDownloadURL};
export const FIREBASE_AUTH = getAuth(app);