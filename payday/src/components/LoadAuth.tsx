import Login from "./Login";
import Signup from "./Signup";
import LoadAuthButton from "./LoadAuthButton";
import PageAuthStore from "../zustand/LoadAuthStore";

const LoadAuth = () => {
  const { page } = PageAuthStore();

  return (
    <div className="bg-slate-700 rounded-md w-80 max-h-90 p-4 shadow-md font-mono">
      <div className="flex flex-row gap-4 place-content-around">
        <LoadAuthButton title="Signup" />
        <LoadAuthButton title="Login" />
      </div>
      {page ? <Signup /> : <Login />}
      {/* <Login />
      <Signup /> */}
    </div>
  );
};

export default LoadAuth;
