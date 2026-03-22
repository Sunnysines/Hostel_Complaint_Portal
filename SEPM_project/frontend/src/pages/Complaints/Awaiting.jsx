import React from 'react';
import { Link } from 'react-router-dom';

export default function Awaiting() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Awaiting Office Action</h3>
          <p className="text-xs text-slate-500">View complaints currently being processed by the office staff</p>
        </div>
        <Link to="/complaints/new" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-all">
          <span className="material-icons-outlined text-sm">add_circle_outline</span> New Complaint
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h4 className="text-sm font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2">
            <span className="material-icons-outlined text-lg">pending_actions</span> Pending Final Action
          </h4>
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
                <td className="px-6 py-4 font-mono text-xs font-semibold">HC/2026/4512</td>
                <td className="px-6 py-4">Network</td>
                <td className="px-6 py-4 font-medium">Wi-Fi connection drops frequently</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase">Acknowledged</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="material-icons-outlined text-red-500 text-base">cancel</span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">29-Jan-2026</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">View Details</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">02</td>
                <td className="px-6 py-4 font-mono text-xs font-semibold">HC/2026/4491</td>
                <td className="px-6 py-4">Electrical</td>
                <td className="px-6 py-4 font-medium">Ceiling light flickering in corridor</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase">Acknowledged</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="material-icons-outlined text-red-500 text-base">cancel</span>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">28-Jan-2026</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing 2 filtered entries</span>
          <div className="flex gap-1">
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-primary text-white">1</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded p-4 flex gap-4">
        <span className="material-icons-outlined text-amber-500">hourglass_empty</span>
        <div>
          <h5 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-1">Processing Status</h5>
          <p className="text-xs text-amber-600 dark:text-amber-500/80 leading-relaxed">
            These complaints have been received and <strong>Acknowledged</strong> by the warden. Please allow 24-48 hours for action taken status updates.
          </p>
        </div>
      </div>
    </div>
  );
}
