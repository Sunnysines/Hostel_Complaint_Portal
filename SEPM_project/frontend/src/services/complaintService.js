import { db, simulateNetworkDelay } from './mockDB';

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

  updateStatus: async (id, status, note = '') => {
    await simulateNetworkDelay(500);
    
    const existing = db.complaints.getAll().find(c => c.id === id);
    if (!existing) throw new Error("Complaint not found");

    const newUpdates = [...existing.updates, { status, timestamp: new Date().toISOString(), note }];
    
    return db.complaints.update(id, { 
      status, 
      updates: newUpdates,
      updatedAt: new Date().toISOString()
    });
  }
};
