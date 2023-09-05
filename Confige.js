
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAHRuZTBlNMLOmEvA7ieVv72mdiPkRMR88",
  authDomain: "navigatefirebase.firebaseapp.com",
  projectId: "navigatefirebase",
  storageBucket: "navigatefirebase.appspot.com",
  messagingSenderId: "798897406401",
  appId: "1:798897406401:web:4536e654cc93dbfd896f40"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export  { firestore };