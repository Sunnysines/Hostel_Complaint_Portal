import React from 'react';

export default function LogoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-sm overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-4">
            <span className="material-icons-outlined text-red-600 dark:text-red-500 text-2xl">
              logout
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-center text-slate-900 dark:text-white mb-2">
            Ready to Leave?
          </h3>
          <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
            Select "Logout" below if you are ready to end your current session.
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                // Add actual logout logic here
                console.log('Logging out...');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
