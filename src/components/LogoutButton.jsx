// import React from "react";

// const LogoutButton = ({ handleLogout }) => {
//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;








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