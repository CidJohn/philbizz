import React, { createContext, useContext, useState, useEffect } from "react";
import { useProtect } from "./useAuthentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError } = useProtect();
  const [isAuthenticated, setIsAuthenticated] = useState(
    (!!localStorage.getItem("access_token") &&
      !!localStorage.getItem("refresh_token")) ||
      (!!sessionStorage.getItem("access_token") &&
        !!sessionStorage.getItem("access_token"))
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [authload, setLoading] = useState(false);

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [data, isLoading, isError]);

  const login = (access_token, refresh_token) => {
    setLoading(true);
    if (rememberMe) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } else {
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
    }
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 2000);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
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
