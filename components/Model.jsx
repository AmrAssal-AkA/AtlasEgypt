import React from "react";
import { useRouter } from "next/router";

function Model({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    router.push("/authentiaction/login");
    onClose();
  };

  const handleSignUp = () => {
    router.push("/authentiaction/signup");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Guest
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please login or sign up to start your vacation planning!
        </p>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Model;
