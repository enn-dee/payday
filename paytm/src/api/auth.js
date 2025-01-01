export const loginUser = async (username, password) => {
    const API_URL = "http://localhost:3000/api/v1/user/login"; 
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid login credentials");
      }
  
      return await response.json(); 
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error; 
    }
  };
  