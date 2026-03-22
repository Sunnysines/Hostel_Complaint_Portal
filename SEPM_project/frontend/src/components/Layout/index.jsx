import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f7f9] dark:bg-[#0f172a] text-slate-800 dark:text-slate-200">
      {/* Navbar on top */}
      <Navbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />

      {/* Main area container below navbar */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Page content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>

          <footer className="shrink-0 h-9 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} SRM Institute of Science and Technology. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
