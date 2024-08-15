import React from 'react';
import LogoutButton from './LogoutButton'; 

const MyComponent = () => {
  const router = useRouter();
  const handleLogout = () => {
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
