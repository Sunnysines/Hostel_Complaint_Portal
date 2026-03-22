import React, { useState } from 'react';

export default function NewComplaint() {
  const [images, setImages] = useState([]);

  // Mock Handle file drop
  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (files) => {
    const validImages = Array.from(files).filter(f => f.type.startsWith('image/'));
    const mapped = validImages.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...mapped].slice(0, 3)); // max 3
  };

  return (
    <div className="max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-[#bce8f1] rounded shadow-sm overflow-hidden text-[#31708f] mb-8">
        
        {/* Blue Header matching the screenshot */}
        <div className="bg-[#d9edf7] border-b border-[#bce8f1] px-4 py-3 flex text-[#31708f]">
          <h2 className="text-[15px] font-semibold flex items-center gap-2">
            <span className="material-icons-outlined text-[18px]">add_box</span>
            New Complaint Registration
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-5 flex flex-col gap-4 text-sm text-[#333] dark:text-slate-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[13px]">Complaint Category <span className="text-red-500">*</span></label>
              <select className="border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 rounded px-3 py-1.5 focus:border-[#66afe9] outline-none shadow-inner h-8">
                <option value="">-- Select Category --</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Carpentry</option>
                <option>Internet/WiFi</option>
                <option>Cleaning/Housekeeping</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[13px]">Complaint Type <span className="text-red-500">*</span></label>
              <select className="border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 rounded px-3 py-1.5 focus:border-[#66afe9] outline-none shadow-inner h-8">
                <option value="">-- Select Type --</option>
                <option>Room</option>
                <option>Corridor</option>
                <option>Washroom</option>
                <option>Common Area</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold text-[13px]">Subject <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Brief subject of the issue..."
              className="border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 rounded px-3 py-1.5 focus:border-[#66afe9] outline-none shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold text-[13px]">Complaint Description <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Provide detailed description..."
              className="border border-[#ccc] dark:border-slate-600 bg-white dark:bg-slate-800 rounded px-3 py-2 focus:border-[#66afe9] outline-none shadow-inner resize-y"
            ></textarea>
          </div>

          {/* Image Upload box */}
          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold text-[13px]">Attach Images (Max 3, optional)</label>
            
            <div 
              onDragOver={e => e.preventDefault()}
              onDrop={onDrop}
              className="border-2 border-dashed border-[#ccc] dark:border-slate-600 bg-[#f9f9f9] dark:bg-slate-800 rounded-md p-6 text-center cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-slate-700 transition flex flex-col items-center justify-center gap-2 group"
              onClick={() => document.getElementById('fileUpload').click()}
            >
              <input 
                id="fileUpload" 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={e => handleFiles(e.target.files)}
              />
              <span className="material-icons-outlined text-4xl text-[#aaa] group-hover:text-[#337ab7]">add_photo_alternate</span>
              <p className="text-[#555] dark:text-slate-400">Click to upload or drag and drop images here</p>
            </div>

            {/* Thumbnail Preview container */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 border border-slate-200 rounded overflow-hidden shadow-sm group">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setImages(images.filter((_, idx) => idx !== i)) }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <span className="material-icons-outlined text-[14px] leading-none block">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#eee] dark:border-slate-700">
            <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-[#333] dark:text-slate-200 border border-[#ccc] dark:border-slate-600 rounded shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition">
              Reset
            </button>
            <button className="px-5 py-1.5 bg-[#5cb85c] hover:bg-[#449d44] border border-[#4cae4c] text-white rounded shadow-sm font-medium transition">
              Submit Complaint
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
