import bcrypt from 'bcryptjs';
import { db, simulateNetworkDelay } from './mockDB';

export const authService = {
  register: async ({ netid, email, password, role }) => {
    await simulateNetworkDelay(600);
    
    // Check if user exists
    const existing = db.users.findByEmailOrNetID(netid);
    const existingEmail = db.users.findByEmailOrNetID(email);
    
    if (existing || existingEmail) {
      throw new Error('User with this NetID or Email already exists.');
    }
    
    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const newUser = {
      netid,
      email,
      password: hashedPassword,
      role: role || 'Student',
      createdAt: new Date().toISOString(),
    };
    
    const savedUser = db.users.add(newUser);
    
    // Don't return password
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  },

  login: async ({ netid, password }) => {
    await simulateNetworkDelay(500);
    
    const user = db.users.findByEmailOrNetID(netid);
    if (!user) {
      throw new Error('Invalid credentials.');
    }
    
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
