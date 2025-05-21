const userRepository = require("../repository/UserRepo");
const {
  HashPassword,
  Token,
  ComparePassword,
  DecodeToken,
} = require("../utils/helper");
const UserDetailsService = require("../services/UserDetailsService");
const sendMail = require("../utils/Mail");

let map = new Map();
exports.CreateUser = async (data) => {
  let user = await userRepository.GetUserByEmail(data.email);
  if (user) {
    throw new Error("User already exists");
  }
  let hash = await HashPassword(data.password);
  data.password = hash;

  user = await userRepository.RegisterUser(data);

  let token = await Token({
    name: user.name,
    email: user.email,
    id: user.id,
    role: user.role,
    gender: user.gender,
  });

  let otp = Math.round(1000 + Math.random() * 8999);
  map.set(token, otp);
  let html = `<div> <a href=http://localhost:5000/api/v1/user/verify/${token}/${otp} > click to verify </a> </div>`;
  await sendMail(user.email, "Verification Email", html);
  return token;
};

exports.Email = async (token, otp) => {
  try {
    let userOtp = map.get(token);
    if (userOtp == otp) {
      let user = await DecodeToken(token);
      let updatedUser = await userRepository.UpdateUser(user.id, {isVerified: true});
      return updatedUser;
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    throw new Error("Error in Email verification: " + error.message);
  }
};

exports.LoginUser = async (data) => {
  let user = await userRepository.GetUserByEmail(data.email);
  if (!user) {
    throw new Error("User not found");
  }
  let MatchPassword = await ComparePassword(user.password, data.password);
  if (!MatchPassword) {
    throw new Error("Incorrect password");
  }
  let token = await Token({
    name: user.name,
    email: user.email,
    id: user.id,
    role: user.role,
    gender: user.gender,
  });
  return token;
};

exports.UpdateUser = async (id, data) => {
  let user = await userRepository.GetUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await userRepository.UpdateUser(id, data);
};

exports.deleteUser = async (id, data) => {
  let user = await userRepository.GetUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await userRepository.DeleteUser(id);
};

exports.getAllUserById = async (id) => {
  let user = await userRepository.GetUserById(id);
  let userDetails = await UserDetailsService.GetUserDetails(id);
  if (!user) {
    throw new Error("User not found");
  }
  return { user, userDetails };
};

exports.getAllUsers = async () => {
  return await userRepository.GetAllUsers();
};

exports.getUserByQuery = async (query) => {
  return await userRepository.GetuserByQuery(query);
};
