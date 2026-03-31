import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import ComplaintDetailsModal from '../../components/ComplaintDetailsModal';
import AdminResolveModal from '../../components/AdminResolveModal';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolvingComplaint, setResolvingComplaint] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getAll();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (c, newStatus) => {
    if (newStatus === 'Resolved') {
      setResolvingComplaint(c);
      return;
    }

    try {
      setUpdatingId(c.id);
      await complaintService.updateStatus(c.id, newStatus, `Status updated to ${newStatus} by Admin`);
      toast.success(`Complaint ${c.id} updated to ${newStatus}`);
      await fetchComplaints();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmResolution = async (complaintId, message, image) => {
    try {
      setUpdatingId(complaintId);
      await complaintService.updateStatus(complaintId, 'Resolved', message, image);
      await fetchComplaints();
    } catch (err) {
      throw err;
    } finally {
      setUpdatingId(null);
      setResolvingComplaint(null);
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    if (status === 'Pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'; 
  };

  const totalPages = Math.ceil(complaints.length / ITEMS_PER_PAGE);
  const currentComplaints = complaints.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Admin Dashboard</h3>
          <p className="text-xs text-slate-500">Manage and track all student complaints</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-primary/5 dark:bg-primary/10 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <span className="material-icons-outlined text-lg">admin_panel_settings</span>
            All Incoming Complaints
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-3 border-b dark:border-slate-800">Complaint ID</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Student NetID</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Category</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Subject</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Date</th>
                <th className="px-6 py-3 border-b dark:border-slate-800">Current Status</th>
                <th className="px-6 py-3 border-b dark:border-slate-800 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-4 text-center text-slate-500">Loading complaints...</td></tr>
              ) : complaints.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-4 text-center text-slate-500">No complaints registered yet.</td></tr>
              ) : (
                currentComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td 
                      className="px-6 py-4 font-mono text-xs font-semibold hover:text-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      {c.id}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{c.userId}</td>
                    <td className="px-6 py-4 capitalize">{c.category}</td>
                    <td 
                      className="px-6 py-4 font-medium hover:text-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      {c.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        disabled={updatingId === c.id}
                        value={c.status}
                        onChange={(e) => handleStatusChange(c, e.target.value)}
                        className="text-xs border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded p-1 focus:ring-primary focus:border-primary disabled:opacity-50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Acknowledged">Acknowledged</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>
            Showing {complaints.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, complaints.length)} of {complaints.length} complaints
          </span>
          <div className="flex gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Prev</button>
            <button className="p-1 px-3 border dark:border-slate-800 rounded bg-primary text-white font-semibold">{currentPage}</button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 px-3 border dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-800 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Next</button>
          </div>
        </div>
      </div>

      <ComplaintDetailsModal 
        complaint={selectedComplaint} 
        isOpen={!!selectedComplaint} 
        onClose={() => setSelectedComplaint(null)} 
        isAdmin={true} 
      />

      <AdminResolveModal 
        complaint={resolvingComplaint} 
        isOpen={!!resolvingComplaint} 
        onClose={() => setResolvingComplaint(null)} 
        onResolve={confirmResolution} 
      />
    </div>
  );
}
