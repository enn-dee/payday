type TokenState = string | null;
const RefreshToken = async (token: TokenState) => {
  try {
    console.log("token: ", token)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("refresh token data: ", data);
    } else {
      const data = await response.json();
      console.log("error in generating accessToken: ", data);
    }
  } catch (error) {
    console.log("error in refresh token ", error);
  }
};

export default RefreshToken;
