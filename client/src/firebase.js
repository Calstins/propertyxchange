// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'propertyxchange-main.firebaseapp.com',
  projectId: 'propertyxchange-main',
  storageBucket: 'propertyxchange-main.appspot.com',
  messagingSenderId: '1080482558346',
  appId: '1:1080482558346:web:873e516b1acaccafd55873',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
