const express = require("express");
const app = express();
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const postRoutes = require("./routes/postRoutes");
const user = require("./model/user");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

app.use("/login",loginRoutes);
app.use("/register",registerRoutes);
app.use("/posts",async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,secret);
        const userData = await user.findOne({_id:decoded.data});
        req.user = userData._id;
        next();
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})
app.use("/posts",postRoutes)

app.get("/",(req,res)=>{
    res.send("ok")
})

module.exports = app;