import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../context/BalanceContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const { executeWithRefresh } = useAuth();
  const { fetchBalance, balance, loading } = useBalance();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await executeWithRefresh(async (token) => {
          await fetchBalance();
        });
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard data loading error:", error);
      }
    };
    loadDashboardData();
  }, [executeWithRefresh, fetchBalance]);

  const quickActions = [
    {
      title: "Deposit Money",
      path: "/deposit",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Withdraw Money",
      path: "/withdraw",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Transfer Money",
      path: "/transfer",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "View Transactions",
      path: "/transactions",
      bgColor: "bg-gray-500",
      hoverColor: "hover:bg-gray-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <BalanceCard balance={balance} />
        </div>

        <section>
          <h2 className="text-2xl text-white mb-6 font-semibold">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.bgColor} ${action.hoverColor} text-white p-4 rounded-lg 
                  transition-all duration-200 transform hover:scale-102 shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800`}
                onClick={() => navigate(action.path)}
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