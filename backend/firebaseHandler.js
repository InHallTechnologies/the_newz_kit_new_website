import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDBsZa-i5e2CsECSi5UowMmjekUu6umYcY",
  authDomain: "thenewzkit.firebaseapp.com",
  databaseURL: "https://thenewzkit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thenewzkit",
  storageBucket: "thenewzkit.appspot.com",
  messagingSenderId: "356670772644",
  appId: "1:356670772644:web:b25ef167f5ab3062079d31",
  measurementId: "G-QKTF96TJ2V"
};


const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
// const analytics = getAnalytics(app);