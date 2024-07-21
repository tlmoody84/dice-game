import React, { useState, useEffect } from "react";
import { getAllDocuments } from "../utils/firebaseUtils";
import { db } from "../../firebase.config";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import RegisterForm from "./components/RegisterForm";

const initialUserState = { username: null, password: null };

function Home() {
  const [userState, setUserState] = useState(initialUserState);

  const handleLogin = (loginData) => {
    const { username, password } = loginData;
    // Simulate user authentication (replace with actual logic)
    if (username === "user" && password === "password") {
      setUserState({ username, password });
    } else {
      console.error("Login failed: Invalid credentials");
      // Handle login failure (e.g., display error message)
    }
  };

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
      {userState.username ? (
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

export default HomePage;