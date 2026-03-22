import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/fee-payment', icon: 'payments', label: 'Fee Payment' },
  { path: '/personal-details', icon: 'person', label: 'Personal Details' },
  { path: '/course-status', icon: 'book', label: 'Course Status' },
  { path: '/grades', icon: 'assessment', label: 'Grade / Mark & Credit' },
  { path: '/attendance', icon: 'fact_check', label: 'Attendance Details' },
  { path: '/exam-revaluation', icon: 'grading', label: 'Exam Revaluation Results' },
  { path: '/exam-provisional', icon: 'history_edu', label: 'Exam Provisional Results' },
  { path: '/timetable', icon: 'schedule', label: 'Timetable' },
  { path: '/internal-marks', icon: 'calculate', label: 'Internal Mark Details' },
  { path: '/hostel-booking', icon: 'bed', label: 'Hostel Booking' },
  { path: '/hostel-details', icon: 'home', label: 'Hostel Details' },
  { path: '/complaints', icon: 'report_problem', label: 'Hostel Complaints' },
  { path: '/transport', icon: 'bus_alert', label: 'Transport Details' },
  { path: '/finance', icon: 'account_balance_wallet', label: 'Finance Details' },
  { path: '/notice-board', icon: 'announcement', label: 'Notice Board' },
  { path: '/abc-id', icon: 'badge', label: 'ABC ID Generation' },
  { path: '/transport-booking', icon: 'directions_bus', label: 'Transport Booking' },
  { path: '/hall-ticket', icon: 'confirmation_number', label: 'Exam HallTicket' },
  { path: '/summer-term', icon: 'event_note', label: 'Summer Term / Compensatory Registration' },
  { path: '/degree-photo', icon: 'photo_camera', label: 'Photo for Degree Certificate' },
  { path: '/scribe', icon: 'edit', label: 'Scribe Request' },
  { path: '/revaluation', icon: 'find_in_page', label: 'Review/Revaluation/Retotal Registration' },
  { path: '/transcript', icon: 'description', label: 'Transcript' },
  { path: '/name-change', icon: 'manage_accounts', label: 'Name Change - Gazette' },
  { path: '/cert-correction', icon: 'spellcheck', label: 'Certificate Correction' },
  { path: '/migration', icon: 'swap_horiz', label: 'Migration Certificate' },
  { path: '/duplicate-cert', icon: 'file_copy', label: 'Duplicate Certificate' },
  { path: '/attestation', icon: 'verified', label: 'Attestation' },
  { path: '/community-cert', icon: 'group', label: 'Community Certificate' },
  { path: '/placement', icon: 'work', label: 'Placement Insight Dashboard' },
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n) => String(n).padStart(2, '0');

  const dayName = days[time.getDay()];
  const day = pad(time.getDate());
  const month = months[time.getMonth()];
  const year = time.getFullYear();
  const hours = pad(time.getHours());
  const mins = pad(time.getMinutes());
  const secs = pad(time.getSeconds());

  return (
    <div className="text-[12px] font-bold text-slate-700 dark:text-slate-300">
      {dayName} {day}-{month}-{year} {hours}:{mins}:{secs}
    </div>
  );
}

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`shrink-0 w-[200px] flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full sticky top-0 transition-all duration-300 ease-in-out ${
        isOpen ? 'ml-0' : '-ml-[200px]'
      }`}
    >
      {/* Nav items */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-start gap-2 px-3 py-1.5 text-[12px] transition-colors leading-snug ${
                      isActive
                        ? 'text-primary dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`material-icons-outlined mt-0.5 flex-shrink-0 ${isActive ? 'text-primary dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
                        style={{ fontSize: '14px' }}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom user info */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">RA2311003011366</div>
          <div className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">SAYANTAN GHOSAL</div>
          <Clock />
        </div>
      </div>
    </aside>
  );
}
