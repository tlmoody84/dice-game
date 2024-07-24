// import React, { useState } from "react";

// const LoginForm = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Basic validation (optional, improve based on your needs)
//     if (!email || !password) {
//       setErrorMessage("Please enter email and password");
//       return;
//     }

//     try {
//       // Call your login function with email and password
//       await onLogin({ email, password });
//       setErrorMessage(null); // Clear any previous errors
//       // Handle successful login (optional, potentially navigate to a different page)
//     } catch (error) {
//       setErrorMessage(error.message || "Login failed"); // Display error message
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//       />
//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//       <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;












import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (add more as needed)
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter email and password');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Replace with your actual login API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Handle successful login, e.g., redirect or show success message
      console.log('Login successful:', data);
      onLogin(data); // Assuming onLogin is a prop to handle successful login
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
