import { UserToken } from "../UserToken";

export const Role = (roles = []) => {
  let role = UserToken()?.role;
  // console.log(role);

  if (roles.includes(role)) {
    return true;
  } else {
    return false;
  }
};
