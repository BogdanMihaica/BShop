// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52-Ukg83OWwruR1_F1kQZTnXaX5MybyQ",
  authDomain: "ecommerce-2-ca43e.firebaseapp.com",
  projectId: "ecommerce-2-ca43e",
  storageBucket: "ecommerce-2-ca43e.appspot.com",
  messagingSenderId: "780360971808",
  appId: "1:780360971808:web:08b08da4e3c43790efae45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
