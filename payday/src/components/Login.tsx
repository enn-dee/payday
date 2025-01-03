import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthStore from "../zustand/AuthStore";

const Login: React.FC = () => {
  const { addAccessToken, addRefreshToken } = AuthStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error("Enter all input fields");
      return;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        addAccessToken(data.accessToken);
        addRefreshToken(data.token);
        // console.log("Data- token ", data.accessToken);
        toast.success(`Logged In`);
        navigate("/dashboard");
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    } catch (error) {
      console.log("Error in login component: ", error);
      toast.error(`${error}`);
    }
  };
  return (
    <div className="bg-slate-700 rounded-md w-80 max-h-90 p-4 shadow-md font-mono">
      <h1 className="text-2xl text-green-500 font-serif text-center underline my-4">
        Welcome Back! Login
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* username */}
        <div className="flex flex-col">
          <label htmlFor="uname" className="text-white">
            Username
          </label>
          <input
            type="text"
            className="p-1 rounded-sm  focus:outline-blue-500 border-blue-400"
            id="uname"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        {/* password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            className="p-1 rounded-sm  focus:outline-blue-500 border-blue-400"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button className="bg-green-500 p-1 rounded-md text-slate-100 font-semibold hover:bg-green-600 hover:text-slate-50">
          Login
        </button>
        <p className="text-slate-400 font-light">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
