import React, { createContext, useContext, useState, useEffect } from "react";
import { useProtect } from "./useAuthentication";
import useStorage from "../storage/Storage";
import { axiosPost } from "./axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getStorage, postStorage, deleteStorage } = useStorage();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getStorage("access_token") && !!getStorage("refresh_token")
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [authload, setLoading] = useState(false);

  const tokenRefresher = async () => {
    const refresher = getStorage("refresh_token");
    if (refresher) {
      try {
        const response = await axiosPost("app/token/refresh/", {
          refresh: refresher,
        });
        const newToken = response;
        postStorage("access_token", newToken, !rememberMe);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        logout();
      }
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      tokenRefresher();
    }, 900000);

    return () => clearInterval(refreshInterval);
  }, [rememberMe]);

  const login = (access_token, refresh_token) => {
    setLoading(true);
    if (rememberMe) {
      postStorage("access_token", access_token, false);
      postStorage("refresh_token", refresh_token, false);
    } else {
      postStorage("access_token", access_token, true);
      postStorage("refresh_token", refresh_token, true);
    }
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 2000);
  };

  const logout = () => {
    setLoading(true);
    deleteStorage("access_token");
    deleteStorage("refresh_token");
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
