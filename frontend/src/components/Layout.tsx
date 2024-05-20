import React from 'react';
import Navbar from './NavBar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
