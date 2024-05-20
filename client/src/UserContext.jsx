<<<<<<< HEAD
import React, { createContext, useState, useContext } from "react";
=======
import React, { createContext, useState, useContext } from 'react';
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
