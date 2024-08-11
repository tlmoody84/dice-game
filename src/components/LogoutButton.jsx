// import React from 'react';
// import LogoutButton from './LogoutButton'; // Import the LogoutButton component

// const MyComponent = () => {
//   const handleLogout = () => {
//     // Your logout logic here, e.g., clear user data, redirect to login page
//     console.log('Logging out...');
//   };

//   return (
//     <div>
//       {/* Other content */}
//       <LogoutButton handleLogout={handleLogout} />
//     </div>
//   );
// };

// export default MyComponent;






import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import LogoutButton from './LogoutButton';

const MyComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);   

      }
    });
    return () => unsubscribe();   

  }, [auth]); // Dependency array to ensure effect runs only once

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Handle successful logout, e.g., clear local storage or redirect
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {/* Other content */}
      {isLoggedIn ? (
        <>
          <p>You are logged in!</p>
          <LogoutButton handleLogout={handleLogout} />
        </>
      ) : (
        // Content for not logged in users
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default MyComponent;