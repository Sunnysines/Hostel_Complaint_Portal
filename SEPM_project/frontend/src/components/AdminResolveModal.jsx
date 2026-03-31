import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminResolveModal({ complaint, isOpen, onClose, onResolve }) {
  const [resolutionMessage, setResolutionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen || !complaint) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image must be less than 2MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resolutionMessage.trim()) {
      toast.error('Please enter a resolution message.');
      return;
    }

    setIsSubmitting(true);
    // Use the base64 preview as the image URL to store in our mock DB
    const imageUrl = imagePreview;

    try {
      await onResolve(complaint.id, resolutionMessage, imageUrl);
      toast.success(`Email dispatched to ${complaint.userId}@srmist.edu.in from admin@srmist.edu.in`);
      onClose();
      // reset state
      setResolutionMessage('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      toast.error('Failed to resolve complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden z-[65] animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="material-icons-outlined text-green-500">check_circle</span>
            Resolve Complaint
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Resolution Message (Sent to Student)
            </label>
            <textarea
              value={resolutionMessage}
              onChange={(e) => setResolutionMessage(e.target.value)}
              placeholder="Explain how the issue was resolved..."
              className="w-full text-sm rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-primary focus:border-primary p-3 min-h-[100px]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Attach Proof of Resolution Image (Optional)
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
            />
            {imagePreview && (
              <div className="mt-2 relative w-32 h-32 rounded border border-slate-200 dark:border-slate-700 overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1"
                >
                  <span className="material-icons-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Resolving...' : 'Confirm Resolution'}
              <span className="material-icons-outlined" style={{ fontSize: '16px' }}>send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
