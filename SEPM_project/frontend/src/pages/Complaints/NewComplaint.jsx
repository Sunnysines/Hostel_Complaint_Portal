import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';

export default function NewComplaint() {
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [roomNo, setRoomNo] = useState('');

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (files) => {
    const validImages = Array.from(files).filter(f => f.type.startsWith('image/'));
    
    // Convert to Base64 so they can be saved in LocalStorage mock DB
    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => {
          const mapped = [...prev, { name: file.name, url: reader.result }];
          return mapped.slice(0, 3);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check mandatory fields
    if (!category || !subject || !description || !hostelName || !roomNo) {
      alert("Please fill out all mandatory fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await complaintService.createComplaint({
        category,
        subject,
        description,
        hostelName,
        roomNo,
        images,
        userId: currentUser?.netid || 'GUEST',
        userEmail: currentUser?.email || 'guest@university.edu.in'
      });
      // Success - navigate back to the log
      navigate('/complaints');
    } catch (err) {
      console.error(err);
      alert("Failed to create complaint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCategory('');
    setSubject('');
    setDescription('');
    setHostelName('');
    setRoomNo('');
    setImages([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h3 className="text-white font-bold flex items-center gap-2">
            <span className="material-icons-outlined text-xl">add_box</span>
            New Complaint Form
          </h3>
        </div>
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Complaint Category <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full h-11 border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded text-sm focus:ring-primary focus:border-primary"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="housekeeping">Housekeeping</option>
                  <option value="wifi">Wi-Fi / Internet</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-11 border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded text-sm focus:ring-primary focus:border-primary"
                  placeholder="Brief subject of your complaint"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Hostel Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-11 border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded text-sm focus:ring-primary focus:border-primary"
                  placeholder="e.g. Oori, Adhiyaman"
                  type="text"
                  value={hostelName}
                  onChange={(e) => setHostelName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Room No. <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-11 border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded text-sm focus:ring-primary focus:border-primary"
                  placeholder="e.g. 402, 105A"
                  type="text"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="Please describe the issue in detail..."
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Attach Image (Optional)
              </label>
              <div className="flex flex-col w-full">
                <div 
                  onDragOver={e => e.preventDefault()}
                  onDrop={onDrop}
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  onClick={() => document.getElementById('fileUpload').click()}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-icons-outlined text-slate-400 text-3xl mb-2">cloud_upload</span>
                    <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                      PNG, JPG or JPEG (MAX. 3)
                    </p>
                  </div>
                  <input id="fileUpload" className="hidden" type="file" multiple accept="image/*" onChange={e => handleFiles(e.target.files)} />
                </div>

                {images.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-24 h-24 border border-slate-200 dark:border-slate-700 rounded overflow-hidden group">
                        <img src={img.url} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImages(images.filter((_, idx) => idx !== i)) }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow"
                        >
                          <span className="material-icons-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                 )}
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <button
                className="bg-primary hover:bg-[#286090] text-white px-8 py-2.5 rounded text-sm font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <span className="material-icons-outlined text-lg animate-spin">autorenew</span>
                ) : (
                   <span className="material-icons-outlined text-lg">send</span>
                )}
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT COMPLAINT'}
              </button>
              <button
                className="px-6 py-2.5 rounded text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                type="reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded p-5 flex gap-4">
        <span className="material-icons-outlined text-blue-500 mt-0.5">info</span>
        <div>
          <h5 className="text-sm font-bold text-blue-800 dark:text-blue-400 mb-2">Important Instructions</h5>
          <ul className="text-xs text-blue-700 dark:text-blue-500/80 list-disc list-inside space-y-1.5 leading-relaxed">
            <li>Complaints will be acknowledged by the warden within 24 hours of submission.</li>
            <li>Please provide specific details like Room Number/Bed Number for faster resolution.</li>
            <li>Uploading a clear photograph of the issue is highly recommended for maintenance staff.</li>
            <li>Once submitted, you can track the status under the 'Awaiting Action' or 'Complaint Log' tabs.</li>
            <li>False or misleading complaints may lead to disciplinary action as per hostel guidelines.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
