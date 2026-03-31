import React, { useState } from 'react';
import { complaintService } from '../services/complaintService';
import { toast } from 'react-hot-toast';

export default function ComplaintDetailsModal({ complaint, isOpen, onClose, isAdmin }) {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('5');
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen || !complaint) return null;

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    if (status === 'Pending') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'; 
  };

  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      toast.error('Please enter a comment.');
      return;
    }
    setIsSubmitting(true);
    try {
      await complaintService.submitFeedback(complaint.id, { text: feedbackText, rating: feedbackRating });
      toast.success('Feedback submitted!');
      onClose(); // Alternatively reload parent state, close brings user to main table to refetch
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolutionUpdate = complaint.updates?.find(u => u.status === 'Resolved');

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

          {resolutionUpdate && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 border-b border-green-100 dark:border-green-800/30 pb-1">Resolution Details</h4>
              <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded border border-green-100 dark:border-green-800/40">
                <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {resolutionUpdate.note}
                </p>
                {resolutionUpdate.image && (
                  <a href={resolutionUpdate.image} target="_blank" rel="noreferrer" className="mt-3 block relative w-32 h-32 border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
                    <img src={resolutionUpdate.image} className="w-full h-full object-cover" alt="Resolution Image" />
                  </a>
                )}
              </div>
            </div>
          )}

          {complaint.status === 'Resolved' && !isAdmin && !complaint.feedback && (
            <div className="mb-6 bg-slate-50 dark:bg-slate-800/40 p-5 rounded border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Provide Feedback</h4>
              <div className="space-y-3">
                <textarea 
                  className="w-full text-sm rounded border-slate-300 p-2 dark:bg-slate-800 dark:text-white focus:ring-primary" 
                  rows="3" 
                  placeholder="How was the resolution?"
                  value={feedbackText} onChange={e => setFeedbackText(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <select value={feedbackRating} onChange={e => setFeedbackRating(e.target.value)} className="text-sm border-slate-300 rounded p-1.5 focus:ring-primary dark:bg-slate-800 dark:text-white">
                    <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value="4">⭐⭐⭐⭐ (Good)</option>
                    <option value="3">⭐⭐⭐ (Average)</option>
                    <option value="2">⭐⭐ (Poor)</option>
                    <option value="1">⭐ (Very Poor)</option>
                  </select>
                  <button 
                    onClick={submitFeedback} disabled={isSubmitting}
                    className="bg-primary text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {complaint.feedback && (
            <div className="mb-6 bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Feedback Provided</h4>
              <p className="text-xl mb-1">{Array(Number(complaint.feedback.rating)).fill('⭐').join('')}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{complaint.feedback.text}"</p>
            </div>
          )}

          <div className="mb-0">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Status Audit Trail</h4>
            <div className="space-y-4">
              {complaint.updates && complaint.updates.map((u, i) => (
                <div key={i} className="flex gap-4 text-sm relative">
                  {i !== complaint.updates.length - 1 && (
                    <div className="absolute left-[38px] top-6 bottom-[-20px] w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  )}
                  <div className="w-20 shrink-0 text-[11px] text-slate-400 font-medium pt-1 text-right">{formatDate(u.timestamp)}</div>
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 mt-1.5 z-10 ring-4 ring-white dark:ring-slate-900 border border-slate-300 dark:border-slate-600"></div>
                  <div className="flex-1 pb-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1 inline-block ${getStatusColor(u.status)}`}>{u.status}</span>
                    {u.note && <div className="text-slate-600 dark:text-slate-400 mt-1 text-xs">{u.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
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
