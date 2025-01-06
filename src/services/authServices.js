export const login = () => {
  window.location.href = `${import.meta.env.VITE_SERVER_ORIGIN}/auth/facebook`;
};

export const logout = () => {
  window.location.href = `${import.meta.env.VITE_SERVER_ORIGIN}/auth/logout`;
};
