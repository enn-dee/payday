import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import toast from "react-hot-toast";
import { accessState } from "../recoil/authStore";
import { balanceState } from "../recoil/accountStore";

const fetchBalance = async (accessToken) => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/account/balance", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch balance");

    const data = await res.json();
    return data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    toast.error("Error fetching balance");
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessState);
  const setBalance = useSetRecoilState(balanceState);
  const userBalance = useRecoilValue(balanceState);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!accessToken) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const balance = await fetchBalance(accessToken);
      if (balance !== null) {
        setBalance(balance);
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
          <BalanceCard balance={userBalance !== null ? userBalance : "Fetching..."} />
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
