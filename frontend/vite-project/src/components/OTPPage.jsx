import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getAuth, signInWithPhoneNumber} from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { initializeApp } from "firebase/app";
import toast, { Toaster } from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyCdlNqJth8qqfgYcxjeKtqhpJJ1U_OKPLg",
  authDomain: "project1-e77df.firebaseapp.com",
  projectId: "project1-e77df",
  storageBucket: "project1-e77df.appspot.com",
  messagingSenderId: "120792810144",
  appId: "1:120792810144:web:c36b38712e1b0c9049ffc5",
  measurementId: "G-NT8BM29RN9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const renderInput = (inputProps) => (
  <input {...inputProps} style={{ width: "40px", height: "40px", margin: "8px" }} />
);
const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          onSignUp();
        },
        "expired-callback": () => {},
      });
    }
  }

  function sendOTP() {
  onCaptchaVerify()
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");
        setShowOTPInput(true);
      })
    .catch((error) => {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP: " + error.message);
      });
  }

  function verifyOTP() {
    if (!window.confirmationResult) {
      toast.error("No OTP received. Please try again.");
      return;
    }

    window.confirmationResult.confirm(otp)
    .then((result) => {
        if (result.user) {
          toast.success("OTP verified successfully!");
          // Handle successful verification
        } else {
          toast.error("OTP verification failed.");
        }
      })
    .catch((error) => {
        toast.error("Error verifying OTP: " + error.message);
      });
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1>Phone Number Verification</h1>
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <div id="recaptcha-container"></div>
      <button onClick={sendOTP}>Send OTP</button>
      {showOTPInput && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OTPPage;