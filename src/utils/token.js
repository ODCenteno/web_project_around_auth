const TOKEN_KEY = "jwt";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  console.log("Token set");
};

export const getToken = () => {
  console.log("Getting token");
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  console.log("Token removed");
};
