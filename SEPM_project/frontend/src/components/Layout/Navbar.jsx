import React, { useEffect, useState } from 'react';
import LogoutModal from '../LogoutModal';

export default function Navbar({ toggleSidebar }) {
  const [isDark, setIsDark] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // Restore dark mode preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <>
      {/* Exact match to screenshot: compact white header */}
      <header className="h-[46px] shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-3 z-10 w-full shadow-sm">
        
        {/* LEFT: hamburger + logo + "Student Portal" */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded p-1 transition-colors flex-shrink-0"
            title="Toggle Sidebar"
          >
            <span className="material-icons-outlined" style={{ fontSize: '20px' }}>menu</span>
          </button>

          <div className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <img src="/srm-logo.png" alt="SRM" className="h-7 w-auto object-contain" />
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wide uppercase mt-0.5">Student Portal</div>
            </div>
          </div>
          
          <div className="flex px-2 overflow-hidden ml-8">
            <h1 className="text-[13px] font-semibold text-primary dark:text-blue-400 truncate">
              Faculty of Engineering and Technology, Kattankulathur
            </h1>
          </div>
        </div>

        {/* RIGHT: dark mode + logout */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>logout</span>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
}
