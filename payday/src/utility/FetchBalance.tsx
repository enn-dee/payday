const FetchBalance = async (token: string) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${BASE_URL}/account/balance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.balance;
  } else {
    return null;
  }
};

export default FetchBalance;
