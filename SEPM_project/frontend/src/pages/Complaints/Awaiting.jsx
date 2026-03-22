import React from 'react';
import { Link } from 'react-router-dom';

export default function Awaiting() {
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-white dark:bg-slate-900 border border-[#e5e7eb] dark:border-slate-800 rounded shadow-sm overflow-hidden text-[#555] dark:text-slate-300">
      
      {/* Search Header */}
      <div className="bg-[#f2f2f2] dark:bg-slate-800/50 p-3 shrink-0 flex items-center gap-2 border-b border-[#dddddd] dark:border-slate-700">
        <select className="border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 text-[#555] dark:text-slate-200 text-sm px-2 py-1 h-8 rounded-sm focus:outline-none focus:border-[#66afe9]">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span className="text-sm">records per page</span>

        <input 
          type="text" 
          placeholder="Search:" 
          className="ml-auto border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 text-[#555] dark:text-slate-200 text-sm px-2 py-1 h-8 rounded-sm focus:outline-none focus:border-[#66afe9] w-48 shadow-inner"
        />
      </div>

      {/* Warning Banner */}
      <div className="bg-[#fcf8e3] text-[#8a6d3b] text-center p-3 font-semibold border-b border-[#faebcc] shrink-0">
        Note : Duplicate Or Fake complaints Registration Will lead To Severe punishment (Ex :- Mess, Hostel etc...) !!
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
        <table className="w-full text-left text-[13px] border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white dark:bg-slate-900 border-b border-t border-[#dddddd] dark:border-slate-700 font-bold text-[#333] dark:text-white sticky top-0 z-10">
              <th className="p-2 w-16 text-center border-r border-[#dddddd] dark:border-slate-700">S.NO</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700">ID</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700 w-[120px]">Category</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700">Type</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700">Subject</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700">Complaint Desc</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700 w-24">Room No</th>
              <th className="p-2 border-r border-[#dddddd] dark:border-slate-700 w-[110px]">C-Date</th>
              <th className="p-2 text-center w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" className="text-center p-6 text-[14px] text-slate-500 bg-slate-50 dark:bg-slate-800/30">
                <div className="flex justify-center mb-2">
                  <span className="material-icons-outlined text-4xl text-slate-300 dark:text-slate-600">
                    inbox
                  </span>
                </div>
                No records to display
                <div className="mt-4">
                  <Link 
                    to="/complaints/new" 
                    className="inline-flex items-center gap-1.5 bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-1.5 rounded-sm shadow-sm transition-colors"
                  >
                    <span className="material-icons-outlined text-[16px]">add</span>
                    Click here to Add Complaints
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-[#f2f2f2] dark:bg-slate-800/50 p-2 px-3 border-t border-[#dddddd] dark:border-slate-700 flex justify-between items-center text-sm shrink-0">
        <div>Showing 0 to 0 of 0 entries</div>
        <div className="flex">
          <button className="px-3 py-1 border border-[#ccc] dark:border-slate-600 bg-[#f9f9f9] dark:bg-slate-700 text-[#777] dark:text-slate-400 cursor-not-allowed rounded-l-sm" disabled>Previous</button>
          <button className="px-3 py-1 border-y border-r border-[#ccc] dark:border-slate-600 bg-[#f9f9f9] dark:bg-slate-700 text-[#777] dark:text-slate-400 cursor-not-allowed rounded-r-sm" disabled>Next</button>
        </div>
      </div>
      
    </div>
  );
}
