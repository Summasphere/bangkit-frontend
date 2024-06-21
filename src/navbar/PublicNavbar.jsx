import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
      navigate('/login');
  };
      
  const handleRegisterClick = () => {
          navigate('/register');
  };
  
  return (
    <div>
      <button onClick={handleLoginClick} className="text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500">
      Log In
      </button>
      <button onClick={handleRegisterClick} className="ml-2 text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500">
      Join for Free
      </button>
    </div>
  );
};

export default PublicNavbar;