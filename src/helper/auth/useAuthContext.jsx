import React, { createContext, useContext, useState, useEffect } from "react";
import { useProtect } from "./useAuthentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError } = useProtect(); // Assume these are available
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [authload, setLoading] = useState(false);

  useEffect(() => {
    // Check if the token is valid on component mount
    if (data && !isError && !isLoading) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [data, isLoading, isError]);

  const login = (token) => {
    setLoading(true);
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 2000);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(false);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setRememberMe, authload }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
