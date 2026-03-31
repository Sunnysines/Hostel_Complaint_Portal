import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'sepm_users';
const COMPLAINTS_KEY = 'sepm_complaints';
const NOTIFICATIONS_KEY = 'sepm_notifications';

// Initialize mock DB
const initDB = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(COMPLAINTS_KEY)) {
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
  }
};

initDB();

// Helper to simulate network latency
export const simulateNetworkDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock DB Operations
export const db = {
  users: {
    getAll: () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
    save: (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users)),
    add: (user) => {
      const users = db.users.getAll();
      users.push(user);
      db.users.save(users);
      return user;
    },
    findByEmailOrNetID: (identifier) => {
      const users = db.users.getAll();
      return users.find(u => u.email === identifier || u.netid === identifier);
    }
  },
  complaints: {
    getAll: () => JSON.parse(localStorage.getItem(COMPLAINTS_KEY) || '[]'),
    save: (complaints) => localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints)),
    add: (complaint) => {
      const complaints = db.complaints.getAll();
      const newComplaint = {
        ...complaint,
        id: `CMP-${uuidv4().substring(0,6).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        updates: [{ status: 'Pending', timestamp: new Date().toISOString(), note: 'Complaint submitted.' }]
      };
      complaints.unshift(newComplaint); // newer first
      db.complaints.save(complaints);
      return newComplaint;
    },
    update: (id, updates) => {
      const complaints = db.complaints.getAll();
      const index = complaints.findIndex(c => c.id === id);
      if (index !== -1) {
        complaints[index] = { ...complaints[index], ...updates };
        db.complaints.save(complaints);
        return complaints[index];
      }
      return null;
    },
    findByUser: (netid) => {
      return db.complaints.getAll().filter(c => c.userId === netid);
    }
  },
  notifications: {
    getAll: () => JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]'),
    save: (notifications) => localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications)),
    add: (notification) => {
      const notifications = db.notifications.getAll();
      const newNotif = {
        ...notification,
        id: `NOTIF-${uuidv4().substring(0,8).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      notifications.unshift(newNotif);
      db.notifications.save(notifications);
      return newNotif;
    },
    markAsReadByUserAndCategory: (userId, category) => {
      const notifications = db.notifications.getAll();
      let changed = false;
      notifications.forEach(n => {
        if (n.userId === userId && n.category === category && !n.isRead) {
          n.isRead = true;
          changed = true;
        }
      });
      if (changed) db.notifications.save(notifications);
    },
    getUnreadCountByUser: (userId) => {
      const notifications = db.notifications.getAll();
      const userNotifs = notifications.filter(n => n.userId === userId && !n.isRead);
      const counts = { Awaiting: 0, Resolved: 0 };
      userNotifs.forEach(n => {
        if (counts[n.category] !== undefined) counts[n.category]++;
      });
      return counts;
    }
  }
};
