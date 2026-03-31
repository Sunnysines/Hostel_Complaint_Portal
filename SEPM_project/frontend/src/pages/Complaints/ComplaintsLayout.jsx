import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import { toast } from 'react-hot-toast';

export default function ComplaintsLayout() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [unreadCounts, setUnreadCounts] = useState({ Awaiting: 0, Resolved: 0 });
  
  const isNewComplaintPage = location.pathname.includes('/complaints/new');

  const hasNotified = useRef(false);

  useEffect(() => {
    const fetchCounts = async () => {
      if (currentUser?.netid && currentUser.role !== 'Admin') {
        const counts = await notificationService.getUnreadCounts(currentUser.netid);
        setUnreadCounts(counts);

        // Toast on first loaded new notifications
        const totalUnread = (counts.Awaiting || 0) + (counts.Resolved || 0);
        if (totalUnread > 0 && !hasNotified.current) {
          toast(`You have ${totalUnread} new updates on your complaints!`, {
            icon: '🔔',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          hasNotified.current = true;
        }
      }
    };
    fetchCounts();
    // Poll for notifications
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const checkAndClear = async () => {
      if (!currentUser) return;
      if (location.pathname.includes('/complaints/awaiting') && unreadCounts.Awaiting > 0) {
        await notificationService.markAsRead(currentUser.netid, 'Awaiting');
        setUnreadCounts(prev => ({ ...prev, Awaiting: 0 }));
      } else if (location.pathname.includes('/complaints/resolved') && unreadCounts.Resolved > 0) {
        await notificationService.markAsRead(currentUser.netid, 'Resolved');
        setUnreadCounts(prev => ({ ...prev, Resolved: 0 }));
      }
    };
    checkAndClear();
  }, [location.pathname, currentUser, unreadCounts]);

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
            <div className="flex items-center">
              Awaiting Action
              {unreadCounts.Awaiting > 0 && (
                <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {unreadCounts.Awaiting}
                </span>
              )}
            </div>
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
            <div className="flex items-center">
              Resolved
              {unreadCounts.Resolved > 0 && (
                <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {unreadCounts.Resolved}
                </span>
              )}
            </div>
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
