import { Outlet } from '@tanstack/react-location';
import React from 'react';
import TouchMenu from '../touchMenu/touchMenu';
import WebMenu from '../webMenu/webMenu';

const Layout = () => {
  return (
    <div className="w-full h-screen flex-col">
      <div className="hidden md:block">
        <WebMenu />
      </div>

      <div className="w-full h-[calc(100%-var(--menu-height))] md:h-[calc(100%-var(--desktop-nav-height))] overflow-x-hidden">
        <Outlet />
      </div>
      <div className="sm:hidden fixed bottom-0 w-full">
        <TouchMenu />
      </div>
    </div>
  );
};

export default Layout;
