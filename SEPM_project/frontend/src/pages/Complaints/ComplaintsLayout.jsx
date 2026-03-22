import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function ComplaintsLayout() {
  const tabs = [
    { name: 'Awaiting', path: '/complaints/awaiting', count: 0 },
    { name: 'Resolved', path: '/complaints/resolved', count: 0 },
    { name: 'Log', path: '/complaints', exact: true },
    { name: 'New Complaint', path: '/complaints/new', highlight: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f7f9] dark:bg-[#0f172a]">
      {/* Sub-header / Tabs */}
      <div className="bg-[#e4ebf1] dark:bg-slate-800/80 px-4 pt-2 shrink-0 border-b border-[#d1d5db] dark:border-slate-700">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              end={tab.exact}
              to={tab.path}
              className={({ isActive }) =>
                `px-5 py-2 text-[13px] rounded-t-lg font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-[#0f172a] text-[#337ab7] dark:text-blue-400 border-t border-x border-[#d1d5db] dark:border-slate-700 border-b-white dark:border-b-[#0f172a] -mb-[1px]'
                    : 'bg-[#f4f7f9] dark:bg-slate-700 text-[#555] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 border border-transparent'
                }`
              }
            >
              {tab.name === 'Awaiting' || tab.name === 'Resolved' ? (
                <div className="flex items-center gap-1.5">
                  <span>{tab.name}</span>
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm leading-none font-bold shadow-sm">
                    {tab.count}
                  </span>
                </div>
              ) : tab.highlight ? (
                <span className="text-[#337ab7] dark:text-blue-400 font-bold flex items-center gap-1">
                  <span className="material-icons-outlined text-[14px]">add_circle</span>
                  {tab.name}
                </span>
              ) : (
                tab.name
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
