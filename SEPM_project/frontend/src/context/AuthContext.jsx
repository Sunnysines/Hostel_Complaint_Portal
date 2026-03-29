import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('sepm_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginContext = (user) => {
    setCurrentUser(user);
    localStorage.setItem('sepm_current_user', JSON.stringify(user));
  };

  const logoutContext = () => {
    setCurrentUser(null);
    localStorage.removeItem('sepm_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginContext, logoutContext, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
