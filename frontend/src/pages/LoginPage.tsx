// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Component for the login page.
 * Allows users to enter their email and password to log in.
 * Redirects to the dashboard page on successful login.
 * Displays an error message if the login fails.
 */
const LoginPage: React.FC = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State variable for error message
  const [error, setError] = useState('');
  // Navigation hook for redirecting to other pages
  const navigate = useNavigate();

  /**
   * Handles the form submission for login.
   * Sends a POST request to the backend with the email and password.
   * Sets the token received from the backend in local storage.
   * Redirects to the dashboard page.
   * Sets an error message if the login fails.
   *
   * @param {React.FormEvent} event - The form submission event
   */
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
