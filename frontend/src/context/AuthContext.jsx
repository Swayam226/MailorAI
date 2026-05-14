import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const authData = localStorage.getItem("authData");

      return authData ? JSON.parse(authData) : null;
    } catch (error) {
      console.error("Failed to parse auth data:", error);

      localStorage.removeItem("authData");

      return null;
    }
  });

  const login = (userData) => {
    localStorage.setItem("authData", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authData");

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
