const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()


exports.Token=async(data)=>{
   try {
    return await jwt.sign(data,process.env.SECRET_KEY)
   } catch (error) {
    throw new Error(error.message)
   }
}

exports.HashPassword=async(password)=>{
let hash=await bcrypt.hash(password,10);
 return hash;
}

exports.ComparePassword=async(hash,password)=>{
   return await bcrypt.compare(password, hash);
}

exports.DecodeToken=async(token)=>{
    try {
     return await jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
     throw new Error(error.message)
    }
}