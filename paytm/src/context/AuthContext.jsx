import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("refreshToken");
      if (token) {
        try {
          await refreshToken();
        } catch (error) {
          console.error("Session restoration failed:", error);
          logout(); // Automatically log out if session restoration fails
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (accessToken, refreshToken) => {
    try {
      setAccessToken(accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login state management failed:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          console.warn("Logout failed on the server, proceeding with client-side logout.");
        }
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken(null);
      localStorage.removeItem("refreshToken");
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout(); // Log out the user if token refresh fails
      throw error;
    }
  };

  const executeWithRefresh = async (apiCall) => {
    try {
      return await apiCall(accessToken);
    } catch (error) {
      if (error.message.includes("token") || error.message.includes("unauthorized")) {
        try {
          const newToken = await refreshToken();
          return await apiCall(newToken);
        } catch (refreshError) {
          console.error("Token refresh failed during API call:", refreshError);
          logout(); // Log out the user if refresh fails during an API call
          throw refreshError;
        }
      }
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const value = {
    accessToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
    refreshToken,
    executeWithRefresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ProtectedRoute component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};
