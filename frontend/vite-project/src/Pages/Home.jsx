import React from "react";
import Navbar from "../components/Navbar";

function  Home() {
  return (
    <>
      <Navbar />
      <div
        id="home"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <div className="space-y-4 w-full max-w-3xl px-4">
          <h1 className="text-lg md:text-xl font-bold text-center">
            Park Smart, Connect Hearts
          </h1>
          <h2 className="text-md md:text-lg font-semibold text-center">
            Discover Your Ideal Spot, Unlock Your Perfect Ride!
          </h2>
          <p className="text-sm md:text-base text-left md:text-center font-normal">
            No stress! Our platform effortlessly matches vehicles with parking
            spots and rentals in seconds, saving you valuable time.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
