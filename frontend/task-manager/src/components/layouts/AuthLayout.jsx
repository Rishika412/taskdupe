import React from "react";
import UI_IMG from "../../assets/images/auth-bg.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex ">
      {/* Left Section - Form */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 overflow-y-auto">
        <h2 className="text-lg font-medium text-black mb-6">Task Manager</h2>
        {children}
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img src={UI_IMG} alt="Auth Visual" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
};

export default AuthLayout;