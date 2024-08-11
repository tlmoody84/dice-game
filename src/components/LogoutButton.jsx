import React from 'react';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

const MyComponent = () => {
  const handleLogout = () => {
    // Your logout logic here, e.g., clear user data, redirect to login page
    console.log('Logging out...');
  };

  return (
    <div>
      {/* Other content */}
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default MyComponent;
