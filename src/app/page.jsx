"use client";
import React, { useState } from "react";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import RegisterForm from "@/components/RegisterForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const initialState = { username: null, password: null }; // Assuming user state object

export default function HomePage() {
  const [userState, setUserState] = useState(initialState);

  const handleLogin = async (loginData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;
      console.log("Login successful:", user); // Replace with success handling (e.g., update user state)
      // You can return the user object if needed
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., display error message to user)
    }
  };

  const handleRegister = async (registerData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const user = userCredential.user;
      console.log("Registration successful:", user); // Replace with success handling (e.g., display success message)
      // You can optionally return the user object if needed
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors (e.g., display error message to user)
    }
  };

  const handleLogout = () => setUserState(initialState);

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-gray-800">
      <h1 className="text-7xl font-bold mb-20 text-center text-white">Welcome to the App</h1>
      {userState.username ? (
        <>
          {/* Display content for logged-in users */}
          <p className="text-xl text-center text-white">Welcome, {userState.username}!</p>
          {/* Add your app content here */}
          <LogoutButton handleLogout={handleLogout} />
        </>
      ) : (
        <>
          {/* Display login and registration forms */}
          <LoginForm onLogin={handleLogin} />
          <RegisterForm onRegister={handleRegister} />
        </>
      )}
    </div>
  );
}

export { HomePage }