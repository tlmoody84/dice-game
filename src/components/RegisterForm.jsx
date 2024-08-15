import React, { useState } from "react";
import { registerUser } from "@/utils/authUtils";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(email, password);
      setEmail("");
      setPassword("");
      // Optionally set success message or redirect
      // Example: setSuccessMessage("Registration successful!"); or window.location.href = "/login";
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-green-600">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email1"
          autoComplete="email"
          required
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-green-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password1"
          autoComplete="current-password"
          required
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
export default RegisterForm;