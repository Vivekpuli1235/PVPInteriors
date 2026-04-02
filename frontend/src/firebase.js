import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO60S4yZAcWxFY3Iaxs5MnzLkMp9ct-Xo",
  authDomain: "ai-studio-applet-webapp-bf140.firebaseapp.com",
  projectId: "ai-studio-applet-webapp-bf140",
  storageBucket: "ai-studio-applet-webapp-bf140.firebasestorage.app",
  messagingSenderId: "1018597353122",
  appId: "1:1018597353122:web:f3027456f9070488a919fb"
};

const app = initializeApp(firebaseConfig);

// ✅ ADD THIS
const auth = getAuth(app);

export { auth };