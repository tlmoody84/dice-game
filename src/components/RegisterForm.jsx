import React, { useState } from 'react';
import { registerUser } from '@/utils/authUtils';
const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setSuccessMessage('');
    try {
      await onRegister(formData); // Assuming onRegister is a prop function to handle registration
      setFormData({ email: '', password: '' }); // Clear form fields
      setSuccessMessage('Registration successful! Please log in.');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-green-600">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="register-email"
          autoComplete="email"
          required
          className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-green-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="register-password"
          autoComplete="new-password"
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
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};
export default RegisterForm;