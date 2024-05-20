import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import AuthRequiredPage from './pages/AuthReqPage';
import ProfileSettingsPage from './pages/ProfileSettings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth-required" element={<AuthRequiredPage />} />
        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
