import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYgEAxePsGoD0Zjtv-VRHO8PIX-Z0bMjg",
  authDomain: "vtrello.firebaseapp.com",
  projectId: "vtrello",
  storageBucket: "vtrello.appspot.com",
  messagingSenderId: "910911981982",
  appId: "1:910911981982:web:bff5a11a6e5e34aa3dae8f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
