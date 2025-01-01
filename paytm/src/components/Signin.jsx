import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "axios";
import { FetchBalance } from "../utility/fetchBalance";
import useTokenStore from "../../zustand/AuthZus";
import { loginUser } from "../api/auth";
import BalanceStore from "../../zustand/BalanceZus";

function Signin() {
  Axios.defaults.withCredentials = true;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // zustand balance state
  const { setBalance } = BalanceStore();
  const navigate = useNavigate();

  const { setTokens } = useTokenStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (!username || !password) {
        throw new Error("Please fill in all fields");
      }

      const data = await loginUser(username.trim().toLowerCase(), password);

      setTokens(data.accessToken, data.refreshToken);

      const balance = await FetchBalance(data.accessToken);

      setBalance(balance);
      
      console.log("User Balance:", balance);

      toast.success("Login successful!");
      navigate("/dashboard");
      
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-700 text-black flex flex-col items-center justify-center">
      <div className="container bg-slate-50 rounded-md p-4 text-center sm:w-60 md:w-80 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-2xl underline underline-offset-3">
          Login
        </h1>
        <p className="text-slate-500 text-xs">
          Welcome back! Please login to continue.
        </p>

        <form
          className="mt-4 text-slate-700 font-mono w-full px-4"
          onSubmit={handleLogin}
        >
          {/* Username Input */}
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

          {/* Password Input */}
          <div className="flex flex-col items-start gap-1 mb-6">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="w-full border border-gray-600 rounded-md outline-none px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg bg-black text-white transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-slate-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Redirect to Signup */}
          <div className="text-slate-500 text-xs mt-4">
            Don’t have an account?{" "}
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
