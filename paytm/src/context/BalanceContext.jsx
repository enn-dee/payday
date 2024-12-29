import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;              

const BalanceContext = createContext(null);

export const BalanceProvider = ({ children }) => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { executeWithRefresh, logout } = useAuth();

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    try {
      await executeWithRefresh(async (token) => {
        const res = await fetch(`${API_BASE_URL}/account/balance`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
  
        setBalance(data.balance);
        return data.balance;
      });
    } catch (error) {
      if (error.message.includes("token") || error.message.includes("unauthorized")) {
        navigate("/login");
      }
      toast.error("Failed to fetch balance");
      console.error("Balance fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [executeWithRefresh, navigate]);
  
  const updateBalance = useCallback((newBalance) => {
    setBalance(newBalance); 
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        fetchBalance,
        balance,
        loading,
        updateBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
