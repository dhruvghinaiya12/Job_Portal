const User = require("../model/UserSchema")

exports.RegisterUser=async(data)=>{
    return await User.create(data);
}

exports.GetUserByEmail=async(email)=>{
    return await User.findOne({email:email});
}

exports.UpdateUser=async(id,data)=>{
    return await User.findByIdAndUpdate(id,data,{new:true});
}

exports.DeleteUser=async(id)=>{
    return await User.findByIdAndUpdate(id,{isActive:false},{new:true});
}

exports.GetAllUsers=async()=>{
    return await User.find();
}

exports.GetUserById=async(id)=>{
    return await User.findById(id);
}


exports.GetuserByQuery=async(query)=>{
    return await User.find(query);
}