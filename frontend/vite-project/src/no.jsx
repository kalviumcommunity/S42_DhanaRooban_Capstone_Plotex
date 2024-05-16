import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
import OTPInput from "react-otp-input";
import { RecaptchaVerifier } from "firebase/auth";
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
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const phoneNumber = "+917092005804";

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

  function onSignUp() {
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult)
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error signing in with phone number:", error);
      });
  }

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1>OTP VALIDATION</h1>
      <div id="recaptcha-container"></div>
      <p>Phone Number: {phoneNumber}</p>
      {showOTP && (
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          separator={<span>-</span>}
          shouldAutoFocus
          renderInput={renderInput} // Pass renderInput function as a prop
        />
      )}
      <button onClick={onSignUp}>Validate</button>
    </div>
  );
};

export default OTPPage;