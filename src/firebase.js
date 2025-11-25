// Firebase initialization and exports
import { initializeApp } from "firebase/app";
import { isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7N70muG3TaSZOjaUHmXams_Eh1gZEEYo",
  authDomain: "monexaa-research.firebaseapp.com",
  projectId: "monexaa-research",
  databaseURL: "https://monexaa-research-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "monexaa-research.appspot.com",
  messagingSenderId: "244905042530",
  appId: "1:244905042530:web:4c20f38d9780650ff1a73b",
  measurementId: "G-43ZQLFWXBF"
};

const app = initializeApp(firebaseConfig);

// Lazy-loaded service instances
let _analytics = null;
let _auth = null;
let _db = null;
let _storage = null;
let _rdb = null;

async function getAnalyticsInstance() {
  if (_analytics) return _analytics;
  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      const { getAnalytics } = await import('firebase/analytics');
      _analytics = getAnalytics(app);
    }
  } catch (err) {
    // ignore analytics errors
  }
  return _analytics;
}

async function getAuthInstance() {
  if (_auth) return _auth;
  try {
    const { getAuth } = await import('firebase/auth');
    _auth = getAuth(app);
  } catch (err) {
    // fail silently — callers should handle null
  }
  return _auth;
}

async function getFirestoreInstance() {
  if (_db) return _db;
  try {
    const { getFirestore } = await import('firebase/firestore');
    _db = getFirestore(app);
  } catch (err) {
    // fail silently
  }
  return _db;
}

async function getStorageInstance() {
  if (_storage) return _storage;
  try {
    const { getStorage } = await import('firebase/storage');
    _storage = getStorage(app);
  } catch (err) {
    // fail silently
  }
  return _storage;
}

async function getRdbInstance() {
  if (_rdb) return _rdb;
  try {
    const { getDatabase } = await import('firebase/database');
    // Use explicit regional database URL to avoid cross-region warnings
    const url = firebaseConfig && firebaseConfig.databaseURL ? firebaseConfig.databaseURL : undefined;
    _rdb = url ? getDatabase(app, url) : getDatabase(app);
  } catch (err) {
    // fail silently
  }
  return _rdb;
}

export { app, getAnalyticsInstance, getAuthInstance, getFirestoreInstance, getStorageInstance, getRdbInstance };
