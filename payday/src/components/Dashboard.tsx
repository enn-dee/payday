import { useEffect } from "react";
import AuthStore from "../zustand/AuthStore";
import BalanceCard from "./BalanceCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FetchBalance from "../utility/FetchBalance";
import BalanceStore from "../zustand/BalanceStore";
import Navbar from "./Navbar";
import RefreshToken from "../utility/RefreshToken";

const Dashboard = () => {
  const { accessToken, refreshToken, removeTokens } = AuthStore();
  const { setBalance } = BalanceStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalanceData = async (token: string) => {
      try {
        type DataState = number | null;
        const data: DataState = await FetchBalance(token);
        if (!data) {
          throw new Error("Failed to fetch balance data.");
        } else if (data === 403) {
          // recall refershToken
          await RefreshToken(refreshToken);
        } else {
          setBalance(data);
          toast.success("Balance updated successfully!");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Error fetching balance. Please try again.");
        removeTokens();
        navigate("/");
      }
    };

    if (!accessToken) {
      console.error("Access token is missing!");
      navigate("/");
      return;
    }

    fetchBalanceData(accessToken);
  }, [accessToken, setBalance]);

  const QuickActions = [
    { name: "Check Balance", path: "checkbalance" },
    { name: "Deposit", path: "deposit" },
    { name: "Withdraw", path: "withdraw" },
  ];

  return (
    <div className="flex flex-col w-full h-full px-4 py-6 bg-gray-800">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <BalanceCard />
      </div>
      <h2 className="text-green-600 text-2xl font-bold text-left underline my-6">
        Quick Actions
      </h2>
      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {QuickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(`/${action.path}`)}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
            aria-label={`Navigate to ${action.name}`}
          >
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
