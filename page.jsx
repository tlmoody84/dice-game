"use client"
import LoginForm from "./src/components/LoginForm";
import LogoutButton from "./src/components/LogoutButton";
import RegisterForm from "./src/components/RegisterForm";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Dice from "./path/to/Dice";

const handleLogin = async (loginData) => {
  const { username, password } = loginData;
  // Simulate user authentication (replace with actual logic)
  if (username === "user" && password === "password") {
    setUserState({ username, password });
  } else {
    console.error("Login failed: Invalid credentials");
    // Handle login failure (e.g., display error message)
  }
};

export default function Page() {

const initialUserState = { username: null, password: null };

function Homepage() {

  const [userState, setUserState] = useState(initialUserState);
  
  const handleRegister = (registerData) => {
    const { username, password } = registerData;
    // Simulate user registration (replace with actual logic)
    setUserState({ username, password });
    console.log("User registration successful (placeholder)");
  };

  const handleLogout = () => setUserState(initialUserState);

  return (
    <div className="container mx-auto px-12 py-12 min-h-screen bg-black">
      <h1 className="text-7xl font-bold mb-20 text-center">Lets start ROLLING</h1>
      {useState.username ? (
        <>
          {/* Your dice rolling component here */}
          <LogoutButton handleLogout={handleLogout} />
        </>
      ) : (
        <>
          <RegisterForm onRegister={handleRegister} />
          <LoginForm onLogin={handleLogin} />
        </>
      )}
    </div>
  );  
}
}
export {Page};


