import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [isPassword, setIsPassword] = useState("password");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const onSignup = async (e) => {
    e.preventDefault();
    if (!fname || !lname || !password || !username) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          password: password,
          username: username,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      navigate("/login");
      setFname("");
      setLname("");
      setPassword("");
      setUsername("");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-700 text-black flex flex-col items-center justify-center ">
      <div className="cotainer bg-slate-50  rounded-md p-2 text-center  sm:w-60 md:w-80 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-2xl underline underline-offset-3">Sign Up</h1>
        <p className="text-slate-500 text-xs">Lorem ipsum dolor sit amet.</p>

        <form className="mt-2 text-slate-700 font-mono" onSubmit={onSignup}>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              value={fname}
              className="border border-gray-600 rounded-md outline-none px-1"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          {/*  */}

          <div className="flex flex-col items-start gap-1">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              value={lname}
              className="border border-gray-600 rounded-md outline-none px-1"
              onChange={(e) => setLname(e.target.value)}
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

          {/* submit button */}
          <button
            className="w-full my-2 rounded-lg py-1 bg-black text-white hover:bg-slate-900"
            type="submit"
          >
            Sign Up
          </button>

          <div className="text-slate-500 text-xs ">
            Already have an account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();

                navigate("/login");
              }}
              className="text-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
