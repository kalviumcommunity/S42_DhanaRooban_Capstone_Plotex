import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCdlNqJth8qqfgYcxjeKtqhpJJ1U_OKPLg",
  authDomain: "project1-e77df.firebaseapp.com",
  projectId: "project1-e77df",
  storageBucket: "project1-e77df.appspot.com",
  messagingSenderId: "120792810144",
  appId: "1:120792810144:web:c36b38712e1b0c9049ffc5",
  measurementId: "G-NT8BM29RN9",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
