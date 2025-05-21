const  mongoose  = require("mongoose")
require("dotenv").config()

const url=process.env.DB_URL

const db=async () =>{
    await mongoose.connect(url)
    console.log("Connected to database")
}

module.exports=db