import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renders the child routes
import NavBar from './NavBar';
import Footer from './Footer';
import Background from './Background';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Background />
      <NavBar />
      <main className="flex-grow pt-20 pb-20">
        <Outlet /> {/* Child routes (Home, Profile, etc.) will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
