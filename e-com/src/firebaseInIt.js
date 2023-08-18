// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqHtNNZkkpJhzgAfgS2cDVZyzc0ttR-Ns",
  authDomain: "flex-cart.firebaseapp.com",
  projectId: "flex-cart",
  storageBucket: "flex-cart.appspot.com",
  messagingSenderId: "851357055721",
  appId: "1:851357055721:web:f6faa73ed8c2be64580e78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);