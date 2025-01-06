export const checkIfAuthenticated = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ORIGIN}/auth/is-authenticated`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
};
