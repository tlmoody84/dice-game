import React, { useState } from 'react';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage('Please enter email and password');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Login successful');
      setIsLoggedIn(true);
      alert('Login successful! Redirecting to game page...');

      window.location.href = "https://dice-game-3zzf4nth8-tlmoody84s-projects.vercel.app/game";
    } catch (error) {
      setErrorMessage('Login failed');
    } finally {
      setIsLoading(false);
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
          id="email"
          autoComplete="email"
          required
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-green-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      {isLoggedIn && <p className="text-green-500">Login successful!</p>}
    </form>
  );
};
export default LoginForm;