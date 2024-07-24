// import { useState } from "react";
// import { registerUser } from "../utils/authUtils";
// import { auth } from "../../firebase.config";

// const RegisterForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);

//   <RegisterForm onRegister={registerUser} setErrorMessage={setErrorMessage} />
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Basic validation (optional, improve based on your needs)
//     if (!email || !password) {
//       setErrorMessage("Please enter email and password");
//       return;
//     }
  
//     try {
//       // Call your registration function with email and password
//       await registerUser(email, password);
//       setEmail(""); // Clear email field after successful registration (optional)
//       setPassword(""); // Clear password field after successful registration (optional)
//       setErrorMessage(null); // Clear any previous errors
//       // Handle successful registration (optional, e.g., display success message, navigate)
//     } catch (error) {
//       setErrorMessage(error.message || "Registration failed"); // Display error message
//     }
//   };

//   return (
//     <div className="items-center justify-center py-8 bg-emerald-50">
//       <p className="py-4 text-2xl font-bold text-center text-emerald-600">
//         The DICE are waiting.
//       </p>
//       <div className="w-full max-w-md p-8 mx-auto space-y-8 bg-white rounded shadow-lg y-4">
//         <h2 className="text-2xl font-bold text-center text-emerald-600">
//           Register
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-emerald-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none bg-gray-200 opacity-50 text-black focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-emerald-700"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none bg-gray-200 opacity-50 text-black focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;



















import React, { useState } from 'react';

const RegisterForm = () => {
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
      // Replace with your actual registration API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // Handle successful registration, e.g., redirect or show success message
      console.log('Registration successful:', data);
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
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;
