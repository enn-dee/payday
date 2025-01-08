const FetchBalance = async (token: string): Promise<number | null> => {
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
  } else if (response.status === 403) {
    // const data = await response.json();
    return 403;
  } else {
    return null;
  }
};

export default FetchBalance;
