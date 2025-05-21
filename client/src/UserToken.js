import { jwtDecode } from "jwt-decode"; 
import Cookies from "js-cookie";

export const UserToken = () => {
  let token = Cookies.get("token");
  return token ? jwtDecode(token) : null;  
};
