import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";

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
      </Routes>
    </>
  );
}

export default App;
