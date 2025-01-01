import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Withdraw from "./components/Withdraw";
import Transfer from "./components/TransferMoney/Transfer";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            error: {
              duration: 1000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          },
        }}
      />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
    </>
  );
}

export default App;
