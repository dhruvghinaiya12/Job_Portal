const UserInfo = require("../model/UserInfoSchema");

exports.GetByUserId = async (userId) => {
  return await UserInfo.findOne({ user: userId });
};

exports.UserDetails = async (payload) => {
  return await UserInfo.create(payload);
};

exports.UpdateDetails = async (id, payload) => {
  return await UserInfo.findByIdAndUpdate(id, payload, { new: true });
};
