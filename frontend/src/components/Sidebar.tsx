import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  }; 

  const handleDashboardClick = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/auth-required');
    }
  };

  return (
    <div className="h-screen w-64 bg-blue-600 text-white flex flex-col items-center py-8 shadow-lg">
      <nav className="flex flex-col space-y-4 w-full px-4">
        <button
          onClick={() => navigate('/')}
          className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
        <button
          onClick={handleDashboardClick}
          className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Dashboard
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;