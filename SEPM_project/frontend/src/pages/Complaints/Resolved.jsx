import React from 'react';

export default function Resolved() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm">
      <span className="material-icons-outlined text-[48px] text-green-400 mb-4">
        check_circle_outline
      </span>
      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No resolved complaints</h3>
      <p className="text-sm mt-1">Complaints that have been fixed will show up here.</p>
    </div>
  );
}
