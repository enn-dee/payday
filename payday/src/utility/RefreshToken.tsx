type TokenState = string | null;

const RefreshToken = async (token: TokenState) => {
  if (!token) {
    console.error("No refresh token provided.");
    return; 
  }

  try {
    console.log("Refreshing token...");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Successfully refreshed token:", data);
      return data; 
    } else {
      const data = await response.json();
      console.error("Error refreshing token:", data);
    }
  } catch (error) {
    console.error("Error occurred during token refresh:", error);
  }
};

export default RefreshToken;
