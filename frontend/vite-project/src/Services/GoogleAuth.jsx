import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Services/firebaseAuth";

const handleGoogleSignIn = async (event) => {
  event.preventDefault();
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const profile = result.user;

    const GoogleUserData = {
      id: profile.uid,
      fullName: profile.displayName,
      givenName: profile.displayName.split(' ')[0],
      familyName: profile.displayName.split(' ')[1],
      imageUrl: profile.photoURL,
      email: profile.email,
    };

  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export default handleGoogleSignIn;
