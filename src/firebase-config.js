
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyASuMi-dqCeW5KMHsralto9IHLylWW-vDg",
  authDomain: "routerdrawnft.firebaseapp.com",
  projectId: "routerdrawnft",
  storageBucket: "routerdrawnft.appspot.com",
  messagingSenderId: "86606749092",
  appId: "1:86606749092:web:165a0cdf17a491f75a7531",
  measurementId: "G-XDCGVQPPYZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(profilePic);
      console.log(name);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};