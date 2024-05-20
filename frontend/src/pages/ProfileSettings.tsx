import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }
        const response = await axios.get('http://localhost:3001/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3001/api/profile',
        { name: profile.name, email: profile.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setError('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
