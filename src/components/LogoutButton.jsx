import React from 'react';
import { logout } from '@/utils/authUtils';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    await logout();
    onLogout();
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};
export default LogoutButton;