const userService = require("../services/UserService");

exports.SignUp = async (req, res) => {
  try {
    let user = await userService.CreateUser(req.body);
    return res.send({ user });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    let user = await userService.LoginUser(req.body);
    return res.send({ user });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.Update = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userService.UpdateUser(id, req.body);
    return res.send(user);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.Delete = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userService.deleteUser(id);
    return res.send(user);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    let users = await userService.getAllUsers();
    return res.send(users);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.GetUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userService.getAllUserById(id);
    return res.send(user);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
}

exports.UsersByQuery=async(req,res)=>{
  try{
    let users=await userService.getUserByQuery(req.query)
    return res.send(users)
  }
  catch(error){
    res.status(404).json({ message: "Error retrieving users", error: error.message })
  }
}

exports.VerifyEmail=async(req,res)=>{
  let {token,otp}=req.params;
  try{
    let user=await userService.Email(token,otp)
    return res.send({ message:"Verified Email" })
  }
  catch(error){
    res.status(404).json({ message: "Error verifying email", error: error.message })
  }
}