// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdKCYr24pqkb1XGYLoTaRClhh65WUgcPc",
  authDomain: "e-library-425705.firebaseapp.com",
  projectId: "e-library-425705",
  storageBucket: "e-library-425705.appspot.com",
  messagingSenderId: "592371361979",
  appId: "1:592371361979:web:f41058880023a21a32219e",
  measurementId: "G-RFT2X3YWQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);