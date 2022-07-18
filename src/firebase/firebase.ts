import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDWxwxUByEi_2TewoiGN8J50a3XGhGpqo',
  authDomain: 'noteballs-581d0.firebaseapp.com',
  projectId: 'noteballs-581d0',
  storageBucket: 'noteballs-581d0.appspot.com',
  messagingSenderId: '119453872266',
  appId: '1:119453872266:web:e6011af22a210523cc3d73',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

console.log('=== call firebase.ts ====');
export { db, auth };
