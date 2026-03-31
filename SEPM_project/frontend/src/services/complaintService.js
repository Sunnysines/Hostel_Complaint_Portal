import { db, simulateNetworkDelay } from './mockDB';
import { notificationService } from './notificationService';

export const complaintService = {
  createComplaint: async (complaintData) => {
    await simulateNetworkDelay(600); // simulate 600ms latency to fulfill NFR (< 3 seconds)
    const newComplaint = db.complaints.add(complaintData);
    return newComplaint;
  },
  
  getByUser: async (netid) => {
    await simulateNetworkDelay(400);
    return db.complaints.findByUser(netid);
  },

  getAll: async () => {
    await simulateNetworkDelay(400);
    return db.complaints.getAll();
  },

  updateStatus: async (id, status, note = '', image = null) => {
    await simulateNetworkDelay(500);
    
    const existing = db.complaints.getAll().find(c => c.id === id);
    if (!existing) throw new Error("Complaint not found");

    const newUpdates = [...existing.updates, { status, timestamp: new Date().toISOString(), note, image }];
    
    const updated = db.complaints.update(id, { 
      status, 
      updates: newUpdates,
      updatedAt: new Date().toISOString()
    });

    let category = 'Awaiting';
    if (status === 'Resolved') category = 'Resolved';
    if (status !== 'Pending') {
      await notificationService.addNotification({
        userId: existing.userId,
        title: `Status Updated`,
        message: `Your complaint ${id} is now ${status}`,
        category,
        complaintId: id
      });
    }

    return updated;
  },

  submitFeedback: async (id, feedbackData) => {
    await simulateNetworkDelay(400);
    const existing = db.complaints.getAll().find(c => c.id === id);
    if (!existing) throw new Error("Complaint not found");
    return db.complaints.update(id, { feedback: feedbackData, updatedAt: new Date().toISOString() });
  },

  getAnalytics: async () => {
    await simulateNetworkDelay(400);
    const complaints = db.complaints.getAll();
    const stats = { total: complaints.length, resolved: 0, pending: 0, categoryCounts: {}, statusCounts: {} };
    complaints.forEach(c => {
      if (c.status === 'Resolved') stats.resolved++;
      if (c.status === 'Pending') stats.pending++;

      stats.categoryCounts[c.category] = (stats.categoryCounts[c.category] || 0) + 1;
      stats.statusCounts[c.status] = (stats.statusCounts[c.status] || 0) + 1;
    });
    return stats;
  }
};
