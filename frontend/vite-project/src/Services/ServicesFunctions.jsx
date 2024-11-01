import BASE_URL from '../Config';
import axios from "axios";
import { GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { auth } from "../Services/firebaseAuth";
import { useNavigate } from "react-router-dom";

export const ServicesFunctions = () => {
    const navigate = useNavigate(); 

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
          const response = await axios.post(
            `${BASE_URL}/gsign`,
           
            { GoogleUserData },
          );
          navigate('/home');
        } catch (error) {
          console.error("Error signing in with Google:", error);
        }
      };

      return {
        handleGoogleSignIn
      };
}