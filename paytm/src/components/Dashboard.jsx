import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBalance = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:3000/api/v1/account/balance",
          {
            credentials: "include",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setBalance(data.balance);
      } catch (error) {
        toast.error("Failed to fetch balance");
        if (error.message === "Unauthorized") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800">
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

      <div className="flex flex-col justify-center items-center w-full p-6 text-white font-mono bg-slate-700">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="bg-slate-600 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-2">Available Balance</h2>
          <p className="text-2xl font-bold text-green-400">
            ₹ {balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h2 className="text-2xl text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/deposit")}
          >
            Deposit Money
          </button>
          <button
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition"
            onClick={() => navigate("/withdraw")}
          >
            Withdraw Money
          </button>
          <button
            className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition"
            onClick={() => navigate("/transfer")}
          >
            Transfer Money
          </button>
          <button
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/transactions")}
          >
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;