import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ComplaintsLayout from './pages/Complaints/ComplaintsLayout';

import Log from './pages/Complaints/Log';
import Awaiting from './pages/Complaints/Awaiting';
import Resolved from './pages/Complaints/Resolved';
import NewComplaint from './pages/Complaints/NewComplaint';

const Dashboard = () => <div className="p-6">Dashboard Info</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/complaints" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="complaints" element={<ComplaintsLayout />}>
            <Route index element={<Log />} />
            <Route path="awaiting" element={<Awaiting />} />
            <Route path="resolved" element={<Resolved />} />
            <Route path="new" element={<NewComplaint />} />
          </Route>
          
          <Route path="*" element={<div className="p-6 font-semibold text-lg text-slate-500">Page coming soon.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
