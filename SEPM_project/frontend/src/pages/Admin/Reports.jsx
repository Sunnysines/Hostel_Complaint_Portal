import React, { useEffect, useState } from 'react';
import { complaintService } from '../../services/complaintService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminReports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await complaintService.getAnalytics();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-slate-500">Loading analytics...</div>;
  if (!stats) return <div className="p-6 text-red-500">Failed to load analytics.</div>;

  const pieData = Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value }));
  const COLORS = { Resolved: '#22c55e', Pending: '#f59e0b', Acknowledged: '#3b82f6', 'In Progress': '#8b5cf6' };

  const barData = Object.entries(stats.categoryCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Analytics & Reports</h3>
          <p className="text-xs text-slate-500">Overview of all hostel complaints</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-sm border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Complaints</h4>
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-sm border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Resolved</h4>
          <div className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.resolved}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-sm border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Pending / Active</h4>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{stats.pending}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-sm border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-6">Status Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-sm border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-6">Category Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
