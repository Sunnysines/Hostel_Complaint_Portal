import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import ComplaintDetailsModal from '../../components/ComplaintDetailsModal';

export default function Log() {
  const { currentUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await complaintService.getByUser(currentUser?.netid || 'GUEST');
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [currentUser]);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    if (status === 'Pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'; // In Progress / Acknowledged
  };

  const getActionIcon = (status) => {
    if (status === 'Pending') return <span className="material-icons-outlined text-slate-300 dark:text-slate-700 text-base">cancel</span>;
    return <span className="material-icons-outlined text-green-500 text-base">check_circle</span>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Hostel Complaint Log</h3>
          <p className="text-xs text-slate-500">Track and manage your hostel-related issues</p>
        </div>
        <Link to="/complaints/new" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-all">
          <span className="material-icons-outlined text-sm">add_circle_outline</span>
          New Complaint
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-primary/5 dark:bg-primary/10 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="material-icons-outlined text-lg">list_alt</span>
            Recent Complaints
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
              {loading ? (
                <tr><td colSpan="8" className="px-6 py-4 text-center text-slate-500">Loading complaints...</td></tr>
              ) : complaints.length === 0 ? (
                <tr><td colSpan="8" className="px-6 py-4 text-center text-slate-500">No complaints found.</td></tr>
              ) : (
                complaints.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</td>
                    <td 
                      className="px-6 py-4 font-mono text-xs font-semibold hover:text-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      {c.id}
                    </td>
                    <td className="px-6 py-4 capitalize">{c.category}</td>
                    <td 
                      className="px-6 py-4 font-medium hover:text-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      {c.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getActionIcon(c.status)}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      {c.status === 'Pending' ? (
                        <button 
                          className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto"
                          onClick={() => setSelectedComplaint(c)}
                        >
                          View Details
                        </button>
                      ) : (
                        <button 
                          className="text-primary hover:underline font-semibold flex items-center justify-end gap-1 ml-auto"
                          onClick={() => setSelectedComplaint(c)}
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing {complaints.length} entries</span>
          <div className="flex gap-1">
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50">Prev</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-primary text-white">1</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800">Next</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded p-4 flex gap-4">
        <span className="material-icons-outlined text-blue-500">info</span>
        <div>
          <h5 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1">Important Instructions</h5>
          <ul className="text-xs text-blue-600 dark:text-blue-500/80 list-disc list-inside space-y-1">
            <li>Complaints will be acknowledged by the warden within 24 hours.</li>
            <li>Please use the 'New Complaint' button to report a fresh issue.</li>
            <li>Resolution time may vary based on the nature of the complaint.</li>
          </ul>
        </div>
      </div>

      <ComplaintDetailsModal 
        complaint={selectedComplaint} 
        isOpen={!!selectedComplaint} 
        onClose={() => setSelectedComplaint(null)} 
        isAdmin={false} 
      />
    </div>
  );
}
