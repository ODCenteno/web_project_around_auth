import { apiAuth } from "./API";

const signup = (credentials) => {
  return apiAuth.authorize("/signup", credentials);
};

const signin = ({ password, email }) => {
  return apiAuth.authorize("/signin", { password, email });
};

const checkToken = (token) => {
  return apiAuth.getUserInfo(token).then((userData) => {
    return userData;
  });
};

export { signup, signin, checkToken };
