const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/instagram")
.then(()=>console.log("DB connection Successfull"))
.catch((err)=>{
    console.log("DB Connection Failed "+err);
})
app.listen(port,()=>console.log("Server is running at",port))