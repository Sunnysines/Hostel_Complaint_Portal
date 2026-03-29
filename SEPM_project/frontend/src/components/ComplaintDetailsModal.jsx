import React from 'react';

export default function ComplaintDetailsModal({ complaint, isOpen, onClose, isAdmin }) {
  if (!isOpen || !complaint) return null;

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    if (status === 'Pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'; 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Complaint Details
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Student Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">Student Information</h4>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-slate-500">Student NetID:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{complaint.userId}</div>
                
                <div className="text-slate-500">Email:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={complaint.userEmail}>{complaint.userEmail}</div>
                
                <div className="text-slate-500">Hostel Name:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{complaint.hostelName || 'N/A'}</div>
                
                <div className="text-slate-500">Room Number:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{complaint.roomNo || 'N/A'}</div>
              </div>
            </div>

            {/* Complaint Meta */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">Complaint Record</h4>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-slate-500">Complaint ID:</div>
                <div className="font-mono font-bold text-primary">{complaint.id}</div>
                
                <div className="text-slate-500">Category:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{complaint.category}</div>
                
                <div className="text-slate-500">Date Submitted:</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(complaint.createdAt)}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">Subject</h4>
            <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{complaint.subject}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">Description</h4>
            <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded border border-slate-100 dark:border-slate-800">
              <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {complaint.description}
              </p>
            </div>
          </div>

          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-1">Attached Evidence</h4>
              <div className="flex gap-4 flex-wrap">
                {complaint.images.map((img, i) => (
                  <a key={i} href={img.url} target="_blank" rel="noreferrer" className="block relative w-32 h-32 border border-slate-200 dark:border-slate-700 rounded overflow-hidden hover:opacity-90 transition-opacity">
                    <img src={img.url} className="w-full h-full object-cover" alt={`Evidence ${i+1}`} />
                  </a>
                ))}
              </div>
            </div>
          )}
          
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
