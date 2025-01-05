import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NavigateDashboard = () => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-black p-2 rounded-md text-white font-mono text-2xl flex flex-row gap-2 justify-center items-center group"
      onClick={() => navigate("/dashboard")}
    >
      <FaArrowLeft
        className="transform transition-transform duration-300 group-hover:-translate-x-2"
        style={{ fontSize: "20px" }}
      />
      <span className="transition-all duration-300">Dashboard</span>
    </button>
  );
};

export default NavigateDashboard;
