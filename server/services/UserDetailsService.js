const userDetailRepository = require("../repository/userDetailsRepo");

exports.GetUserDetails = async (userId) => {
  try {
    return await userDetailRepository.GetByUserId(userId);
  } catch (error) {
    throw new Error("Couldn't find user")
  }
};

exports.CreateUserDetails = async (payload) => {
  try {
    const existing = await userDetailRepository.GetByUserId(payload.user);
    if (existing) {
      throw new Error("User details already exist");
    }
    return await userDetailRepository.UserDetails(payload);
  } catch (error) {
    console.error("Mongoose create error:", error);
    throw new Error(error.message || "Couldn't create user");
  }
};

exports.UpdateUserDetails = async (id, payload) => {
  try {
    return await userDetailRepository.UpdateDetails(id, payload);
  } catch (error) {
    throw new Error("Couldn't update user")
  }
};