import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants"
import "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAHRuZTBlNMLOmEvA7ieVv72mdiPkRMR88",
  authDomain: "navigatefirebase.firebaseapp.com",
  projectId: "navigatefirebase",
  storageBucket: "navigatefirebase.appspot.com",
  messagingSenderId: "798897406401",
  appId: "1:798897406401:web:7131f3f7bd797a5c896f40"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
export const saveToken = async (userId,token) => {
    const values=await firestore
}
