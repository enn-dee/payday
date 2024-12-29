import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await login(data.accessToken, data.refreshToken);
      
      toast.success("Login successful!");
      navigate("/dashboard");

      setUsername("");
      setPassword("");
      setIsPassword("password");
      
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-700 text-black flex flex-col items-center justify-center">
      <div className="container bg-slate-50 rounded-md p-2 text-center sm:w-60 md:w-80 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-2xl underline underline-offset-3">
          Login
        </h1>
        <p className="text-slate-500 text-xs">Welcome back! Please login to continue.</p>

        <form className="mt-2 text-slate-700 font-mono w-full px-4" onSubmit={handleLogin}>
          {/* Username field */}
          <div className="flex flex-col items-start gap-1 mb-4">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-600 rounded-md outline-none px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="Enter your username"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col items-start gap-1 mb-6">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={isPassword}
                id="password"
                className="w-full border border-gray-600 rounded-md outline-none px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsPassword(isPassword === "password" ? "text" : "password")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {isPassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg bg-black text-white hover:bg-slate-900 transition-colors
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-900'}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign up link */}
          <div className="text-slate-500 text-xs mt-4">
            Don`t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;