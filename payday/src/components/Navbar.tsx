import { useNavigate } from "react-router-dom";
import AuthStore from "../zustand/AuthStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const { removeTokens } = AuthStore();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    removeTokens();
    toast.success(`Logged out`);
    navigate("/");
  };
  return (
    <div className="w-full h-16 p-4 bg-slate-950 text-white font-mono flex flex-row justify-between items-center rounded-md">
      <h2 className="text-fuchsia-400 ">Payday.</h2>
      <button onClick={handleLogout} className="hover:text-slate-300">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
