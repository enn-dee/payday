import useTokenStore from "../../../zustand/AuthZus";

const Transfer = () => {
  const { accessToken, addAccessToken, refreshToken } = useTokenStore();
  const handleClick = () => {

    addAccessToken("accessToken");
    console.log(refreshToken)
    console.log(accessToken);
  };
  //   addAccessToken("accessToken");
  return (
    <div>
      <h2>{accessToken ? accessToken : "Loading..."}</h2>
      <button
        onClick={handleClick}
        style={{ background: "black", padding: "2px", color: "white" }}
      >
        add
      </button>
    </div>
  );
};

export default Transfer;
