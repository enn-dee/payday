import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Withdraw from "./components/Withdraw";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";
import { BalanceProvider } from "./context/BalanceContext";

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
      <AuthProvider>
        <BalanceProvider>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/withdraw" element={<Withdraw />} />
          </Routes>
        </BalanceProvider>
      </AuthProvider>
    </>
  );
}

export default App;
