import { useEffect } from "react";
import AuthStore from "../zustand/AuthStore";

const Dashboard = () => {
    const {accessToken} = AuthStore();
  useEffect(() => {
    console.log("token: ", accessToken)
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
