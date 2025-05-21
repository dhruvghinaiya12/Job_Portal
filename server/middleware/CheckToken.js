const jwt = require("jsonwebtoken");
require("dotenv").config();

const Token=async(req,res,next)=>{
    const PublicRoute=["/user/signup","/user/login"]

    let url=req.url
    if(url.includes("/user/verify")){
        return next();
    }

    if(PublicRoute.includes(req.url)){
        return next();
    }
    let token = req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: "Token is required"});
    }
    
    try {
        let Decode=await jwt.verify(token, process.env.SECRET_KEY);
        req.user=Decode;
        next();
    } catch (error) {
        return res.status(401).json({message: "You are not authorized"});
    }
}

module.exports=Token;