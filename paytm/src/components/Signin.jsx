import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  return (
    <>
      <h2>login</h2>
      <button onClick={() => navigate("/")} className="text-blue-700">signup</button>
    </>
  );
}

export default Signin;
