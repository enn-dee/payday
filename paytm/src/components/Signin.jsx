import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState("password");

  const navigate = useNavigate();
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        throw new Error("Input fields required");
      }
      const res = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      const { accessToken } = data;

      localStorage.setItem("accessToken", accessToken );
      toast.success(data.message);

      navigate("/dashboard")
      setPassword("");
      setUsername("");
      setIsPassword("password");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-700 text-black flex flex-col items-center justify-center ">
      <div className="cotainer bg-slate-50  rounded-md p-2 text-center  sm:w-60 md:w-80 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-2xl underline underline-offset-3">
          Login
        </h1>
        <p className="text-slate-500 text-xs">Lorem ipsum dolor sit amet.</p>

        <form className="mt-2 text-slate-700 font-mono" onSubmit={onLogin}>
          {/*  */}
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              id="uname"
              className="border border-gray-600 rounded-md outline-none px-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/*  */}
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={isPassword}
                id="password"
                value={password}
                className="border border-gray-600 rounded-md outline-none px-1"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPassword(
                    isPassword === "password" ? "text" : "password"
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {isPassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* submit button */}
          <button
            className="w-full my-2 rounded-lg py-1 bg-black text-white hover:bg-slate-900"
            type="submit"
          >
            Login
          </button>

          <div className="text-slate-500 text-xs ">
            Don`t have account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();

                navigate("/");
              }}
              className="text-blue-400"
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
