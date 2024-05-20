import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get('http://localhost:3001/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between border-b-2 border-blue-700">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold mr-2 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-400 to-green-500">
          CoinToss v2
        </Link>
      </div>
      <div className="flex-1 mx-4 flex justify-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center text-white font-bold"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaUserCircle className="text-white text-2xl mr-2" />
          {userName || 'Profile'}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md border border-gray-300">
            <Link
              to="/profile-settings"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => setDropdownOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
