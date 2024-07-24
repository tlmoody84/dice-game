import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation (optional, improve based on your needs)
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }

    try {
      // Call your login function with email and password
      await onLogin({ email, password });
      setErrorMessage(null); // Clear any previous errors
      // Handle successful login (optional, potentially navigate to a different page)
    } catch (error) {
      setErrorMessage(error.message || "Login failed"); // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
        Login
      </button>
    </form>
  );
};

export default LoginForm;