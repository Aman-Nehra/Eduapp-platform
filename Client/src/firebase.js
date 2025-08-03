import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCavkKcy3GmdqgWSXyqK-9MKFKN30LrPkA",
  authDomain: "learningapp-e257e.firebaseapp.com",
  projectId: "learningapp-e257e",
  storageBucket: "learningapp-e257e.firebasestorage.app",
  messagingSenderId: "1059585168229",
  appId: "1:1059585168229:web:0bac497779dd347b6bc78c",
  measurementId: "G-GQK946KE65"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);