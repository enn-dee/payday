import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/v1/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      setAccessToken(null);
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/token/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };
  return (
    <AuthContext.Provider value={{ accessToken, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
