import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function ComplaintsLayout() {
  const location = useLocation();
  const isNewComplaintPage = location.pathname.includes('/complaints/new');

  return (
    <div className="flex flex-col h-full bg-[#f4f7f9] dark:bg-[#0f172a]">
      {/* Sub-header / Tabs perfectly matching HTML mockups */}
      <div className="bg-white dark:bg-slate-900 px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          
          <NavLink
            to="/complaints"
            end
            className={({ isActive }) =>
              `py-4 text-sm whitespace-nowrap ${
                isActive
                  ? 'font-semibold text-primary border-b-2 border-primary'
                  : 'font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-b-2 border-transparent'
              }`
            }
          >
            Complaint Log
          </NavLink>

          <NavLink
            to="/complaints/awaiting"
            className={({ isActive }) =>
              `py-4 text-sm whitespace-nowrap ${
                isActive
                  ? 'font-semibold text-primary border-b-2 border-primary'
                  : 'font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-b-2 border-transparent'
              }`
            }
          >
            Awaiting Action
          </NavLink>

          <NavLink
            to="/complaints/resolved"
            className={({ isActive }) =>
              `py-4 text-sm whitespace-nowrap ${
                isActive
                  ? 'font-semibold text-primary border-b-2 border-primary'
                  : 'font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-b-2 border-transparent'
              }`
            }
          >
            Resolved
          </NavLink>

          {/* New Complaint tab only appears when on the /complaints/new route */}
          {isNewComplaintPage && (
            <NavLink
              to="/complaints/new"
              className={({ isActive }) =>
                `py-4 text-sm whitespace-nowrap uppercase tracking-wide ${
                  isActive
                    ? 'font-semibold text-primary border-b-2 border-primary'
                    : 'font-medium text-slate-500 dark:text-slate-400 hover:text-primary border-b-2 border-transparent'
                }`
              }
            >
              New Complaint
            </NavLink>
          )}

        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
