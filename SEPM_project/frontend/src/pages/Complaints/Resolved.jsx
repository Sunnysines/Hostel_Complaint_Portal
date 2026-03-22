import React from 'react';
import { Link } from 'react-router-dom';

export default function Resolved() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Resolved Complaints</h3>
          <p className="text-xs text-slate-500">History of all successfully closed hostel issues</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-green-50/50 dark:bg-green-900/10 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
          <h4 className="text-sm font-bold text-green-700 dark:text-green-500 flex items-center gap-2">
            <span className="material-icons-outlined text-lg">check_circle</span>
            Resolved Issues History
          </h4>
          <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded uppercase">Showing Resolved Only</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-3 border-b dark:border-slate-800">Sl.No</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Complaint ID</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Category</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Subject</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Status</th>
                <th className="px-6 py-3 border-b dark:border-slate-800 text-center">Action Taken</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Date</th>
                <th className="px-6 py-3 border-b dark:border-slate-800 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">01</td>
                <td className="px-6 py-4 font-mono text-xs font-semibold">HC/2026/4105</td>
                <td className="px-6 py-4">Carpentry</td>
                <td className="px-6 py-4 font-medium">Cupboard lock issue</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">Resolved</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="material-icons-outlined text-green-500 text-base">check_circle</span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">20-Jan-2026</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">
                    View Response
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">02</td>
                <td className="px-6 py-4 font-mono text-xs font-semibold">HC/2026/3855</td>
                <td className="px-6 py-4">Electrical</td>
                <td className="px-6 py-4 font-medium">Study lamp flickering</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">Resolved</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="material-icons-outlined text-green-500 text-base">check_circle</span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">15-Jan-2026</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">
                    View Response
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">03</td>
                <td className="px-6 py-4 font-mono text-xs font-semibold">HC/2026/3721</td>
                <td className="px-6 py-4">Civil</td>
                <td className="px-6 py-4 font-medium">Window frame repair</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">Resolved</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="material-icons-outlined text-green-500 text-base">check_circle</span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">10-Jan-2026</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">
                    View Response
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing 3 resolved entries</span>
          <div className="flex gap-1">
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50">Prev</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-primary text-white">1</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800">Next</button>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded p-4 flex gap-4">
        <span className="material-icons-outlined text-green-600 dark:text-green-500">task_alt</span>
        <div>
          <h5 className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">Resolved Status Information</h5>
          <p className="text-xs text-green-600 dark:text-green-500/80">
            These complaints have been verified and closed by the hostel office. You can view the specific actions taken and staff remarks by clicking 'View Response'.
          </p>
        </div>
      </div>
    </div>
  );
}
