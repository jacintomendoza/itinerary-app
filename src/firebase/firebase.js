import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF7-sJFhePK2tnUSZirPE6K5cPZ6UP2vM",
  authDomain: "itinerary-images.firebaseapp.com",
  projectId: "itinerary-images",
  storageBucket: "itinerary-images.appspot.com",
  messagingSenderId: "650245714192",
  appId: "1:650245714192:web:622ce2b56e00914ed7f595",
  measurementId: "G-4E7V68VVKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;