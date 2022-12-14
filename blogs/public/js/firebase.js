import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4MvZy0r0ExfJImSLj3aZNO2YE1Fv369c",
  authDomain: "blogging-website-53f20.firebaseapp.com",
  projectId: "blogging-website-53f20",
  storageBucket: "blogging-website-53f20.appspot.com",
  messagingSenderId: "782438534601",
  appId: "1:782438534601:web:cc40bf2165710fb2146c18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);