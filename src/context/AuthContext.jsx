import React, { createContext, useState, useContext } from "react";
import API from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password }); // uses axiosClient
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
