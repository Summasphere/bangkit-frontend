import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleHelpClick = () => {
    const helpSection = document.querySelector('.help-section');
    if (helpSection) {
      helpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoutClick = () => {
    navigate('/logout');
  }

  return (
    <div className="flex flex-row items-center">
      <button
        onClick={handleHomeClick}
        className="text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500"
      >
        Home
      </button>
      <button
        onClick={handleHelpClick}
        className="ml-2 text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500"
      >
        Help
      </button>
      <button
        onClick={handleAboutClick}
        className="ml-2 text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500"
      >
        About
      </button>
      <button
        onClick={handleLogoutClick}
        className="ml-2 text-white py-2 px-4 rounded bg-transparent border border-transparent hover:bg-white hover:text-blue-500"
      >
        Logout
      </button>
      <div className="ml-2 w-10 h-10 flex justify-center items-center rounded-full border-2 border-white">
        <span className="text-white text-sm">MM</span>
      </div>
    </div>
  );
};

export default UserNavbar;