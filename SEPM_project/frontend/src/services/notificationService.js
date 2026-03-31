import { db, simulateNetworkDelay } from './mockDB';

export const notificationService = {
  addNotification: async (notificationData) => {
    // notificationData: { userId, title, message, type, category, complaintId }
    await simulateNetworkDelay(200);
    return db.notifications.add(notificationData);
  },

  getUnreadCounts: async (userId) => {
    await simulateNetworkDelay(200);
    return db.notifications.getUnreadCountByUser(userId);
  },

  markAsRead: async (userId, category) => {
    await simulateNetworkDelay(200);
    db.notifications.markAsReadByUserAndCategory(userId, category);
    return true;
  }
};
