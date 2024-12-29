import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <nav className="bg-slate-900 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">PayDay</h1>
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
