import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/backend.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const token = localStorage.getItem("seasafe_token");
  console.log("Stored token:", token);

  if (token) {
    console.log("Calling /auth/me...");

    authAPI
      .getMe()
      .then((data) => {
        console.log("User restored:", data);
        setUser(data.user);
      })
      .catch((err) => {
        console.log("getMe failed:", err);
        localStorage.removeItem("seasafe_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  } else {
    console.log("No token found");
    setLoading(false);
  }
}, []);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    localStorage.setItem("seasafe_token", data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const data = await authAPI.register({ name, email, password, phone });
    localStorage.setItem("seasafe_token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("seasafe_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
