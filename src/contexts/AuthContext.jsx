import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('userBookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [membership, setMembership] = useState(() => {
    const savedMembership = localStorage.getItem('userMembership');
    return savedMembership ? JSON.parse(savedMembership) : null;
  });

  const login = (user, password) => {
    if (user === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setUsername(user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setBookings([]);
    setMembership(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userBookings');
    localStorage.removeItem('userMembership');
  };

  const addBooking = (booking) => {
    const newBookings = [...bookings, { ...booking, id: Date.now() }];
    setBookings(newBookings);
    localStorage.setItem('userBookings', JSON.stringify(newBookings));
  };

  const purchaseMembership = (membershipData) => {
    const newMembership = {
      ...membershipData,
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    };
    setMembership(newMembership);
    localStorage.setItem('userMembership', JSON.stringify(newMembership));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      username, 
      bookings, 
      membership,
      login, 
      logout, 
      addBooking,
      purchaseMembership
    }}>
      {children}
    </AuthContext.Provider>
  );
};
