import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import LoadAuth from "./components/LoadAuth";
import Withdraw from "./components/Withdraw";

function App() {
  return (
    <div className="w-full h-screen bg-slate-800 grid place-items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "gray",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LoadAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </div>
  );
}

export default App;
