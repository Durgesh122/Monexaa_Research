// Firebase initialization and exports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC7N70muG3TaSZOjaUHmXams_Eh1gZEEYo",
  authDomain: "monexaa-research.firebaseapp.com",
  projectId: "monexaa-research",
  storageBucket: "monexaa-research.firebasestorage.app",
  messagingSenderId: "244905042530",
  appId: "1:244905042530:web:4c20f38d9780650ff1a73b",
  measurementId: "G-43ZQLFWXBF"
};

const app = initializeApp(firebaseConfig);

// Conditionally initialize analytics (only in supported browsers)
let analytics = null;
async function initAnalytics() {
  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      analytics = getAnalytics(app);
    }
  } catch (err) {
    // Analytics not supported or failed to initialize — ignore silently
  }
}

// call but don't await here so app initializes synchronously
initAnalytics();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rdb = getDatabase(app);

export { app, analytics, auth, db, storage, rdb };
