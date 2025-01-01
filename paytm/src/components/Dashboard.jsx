import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import toast from "react-hot-toast";
import { FetchBalance } from "../utility/fetchBalance";
import BalanceStore from "../../zustand/BalanceZus";
import useTokenStore from "../../zustand/AuthZus";

function Dashboard() {
  const navigate = useNavigate();

  // Zustand store states
  const { balance, setBalance } = BalanceStore();
  const { accessToken } = useTokenStore();
  
  // useEffect(() => {
  //   console.log("Updated balance:", balance);
  // }, [balance]);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!accessToken) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const fetchedbalance = await FetchBalance(accessToken);
        if (fetchedbalance !== null) {
          setBalance(fetchedbalance);
        } else {
          toast.error("Failed to fetch balance.");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Error fetching balance.");
      }
    };

    loadDashboardData();
  }, [accessToken, navigate, setBalance]);

  const quickActions = [
    { title: "Deposit Money", path: "/deposit" },
    { title: "Withdraw Money", path: "/withdraw" },
    { title: "Transfer Money", path: "/transfer" },
    { title: "View Transactions", path: "/transactions" },
  ];

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <BalanceCard balance={balance !== null ? balance : "Fetching..."} />
        </div>
        <section>
          <h2 className="text-2xl text-white mb-6 font-semibold">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
                onClick={() => {
                  console.log(`Navigating to ${action.path}`);
                  navigate(action.path);
                }}
              >
                {action.title}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
