import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthReqPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md">
          <h1 className="text-4xl font-extrabold mb-4 text-red-600">Access Restricted</h1>
          <p className="text-lg mb-8 text-gray-700">
            Please log in or sign up to view the Dashboard.
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthReqPage;
