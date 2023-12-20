import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAllIbSmA-nHl6LUE2BePvgZWuJLHgIPsc",
  authDomain: "in-loft-9601c.firebaseapp.com",
  projectId: "in-loft-9601c",
  storageBucket: "in-loft-9601c.appspot.com",
  messagingSenderId: "867946823466",
  appId: "1:867946823466:web:0872f5aaae33081f102853"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const getAuthUserId = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe();
        resolve(user.uid);
      } else {
        reject(new Error("Користувач не авторизований"));
      }
    });
  });
};