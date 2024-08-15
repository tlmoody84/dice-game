"use client";
import React, { useState } from "react";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import RegisterForm from "@/components/RegisterForm";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";



const initialState = { username: null, password: null };
export default function HomePage() {
  

  const [userState, setUserState] = useState(initialState);
  const handleLogin = async (loginData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;
      console.log("Login successful:", user);
      setUserState({ username: user.email, password: loginData.password }); // Update userState with user info
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors
    }
  };
  const handleRegister = async (registerData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const user = userCredential.user;
      console.log("Registration successful:", user);
      setUserState({ username: user.email, password: registerData.password }); // Update userState with user info
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors
    }
  };
  const handleLogout = () => setUserState(initialState);
  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-gray-800">
      <h1 className="text-7xl font-bold mb-20 text-center text-white">Register to ROLL</h1>
      {userState.username ? (
        <>
          <p className="text-xl text-center text-white">Welcome, {userState.username}!</p>
          <LogoutButton handleLogout={handleLogout} />
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm onRegister={handleRegister} />
        </>
      )}
    </div>
  );
}











