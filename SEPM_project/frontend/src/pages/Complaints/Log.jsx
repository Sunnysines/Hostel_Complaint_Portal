import React from 'react';
import { Link } from 'react-router-dom';

export default function Log() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm overflow-hidden flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <form className="flex-1 max-w-sm relative">
          <input 
            type="text" 
            placeholder="Search log..."
            className="w-full text-sm py-1.5 pl-3 pr-10 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#337ab7] focus:border-transparent transition-all shadow-inner"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 text-slate-400 hover:text-[#337ab7]">
            <span className="material-icons-outlined text-[18px]">search</span>
          </button>
        </form>
        
        <Link 
          to="/complaints/new" 
          className="ml-4 flex items-center gap-1.5 bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm"
        >
          <span className="material-icons-outlined text-[16px]">add</span>
          New Complaint
        </Link>
      </div>

      {/* Empty State Body (Placeholder for table) */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400">
        <span className="material-icons-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-4">
          history
        </span>
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No complaints logged yet</h3>
        <p className="text-sm mt-1">Your past and current complaints will appear here.</p>
        <Link 
          to="/complaints/new" 
          className="mt-6 font-medium text-[#337ab7] hover:underline"
        >
          Click here to file a new complaint
        </Link>
      </div>
    </div>
  );
}
