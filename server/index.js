const express = require('express');
const cors=require("cors");
const db = require("./config/db");
const AppRoutes = require("./routes/index");
const Token = require("./middleware/CheckToken");
require("dotenv").config();

const port=process.env.PORT || 5050
const app=express()

app.use(cors());
app.use(express.json())

app.use("/api/v1",Token,AppRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
   db();
})