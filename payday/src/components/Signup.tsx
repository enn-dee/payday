import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fname || !lname || !username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
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

      if (response.ok) {
        const result = await response.json();
        // console.log("REsult: ", result);
        toast.success("Signup successful!");
        // console.log("Signup Result:", result);
      } else {
        const error = await response.json();
        toast.error(`Signup failed: ${error.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      // console.error("Signup Error:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl text-green-500 font-serif text-center underline">
        Signup
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="fname" className="text-white">
            First Name
          </label>
          <input
            type="text"
            className="p-1 rounded-sm  focus:outline-blue-500 border-blue-400"
            id="fname"
            value={fname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFname(e.target.value)
            }
          />
        </div>
        {/* lname */}
        <div className="flex flex-col">
          <label htmlFor="lname" className="text-white">
            Last Name
          </label>
          <input
            type="text"
            className="p-1 rounded-sm  focus:outline-blue-500 border-blue-400"
            id="lname"
            value={lname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLname(e.target.value)
            }
          />
        </div>
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
          Signup
        </button>
       
      </form>
    </div>
  );
};

export default Signup;
