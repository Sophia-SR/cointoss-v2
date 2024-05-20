import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-600">Welcome to CoinToss v2</h1>
          <p className="text-lg mb-8 text-gray-700">
            Your ultimate financial management tool. Securely connect your bank accounts and manage your finances effortlessly.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
