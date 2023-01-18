import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTlR92GiaUhtuXcFAYfPuTytIYqQHVVtw",
  authDomain: "goit-rn-app.firebaseapp.com",
  projectId: "goit-rn-app",
  storageBucket: "goit-rn-app.appspot.com",
  messagingSenderId: "470526135617",
  appId: "1:470526135617:web:87ae029b104499dccf25c0",
  measurementId: "G-DKCWWGSHHP",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
