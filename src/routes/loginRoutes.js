const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.secret;

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.post("/",body("email").isEmail(),async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    const userData = await user.findOne({email:email});

    if(userData != null){
        var result = await bcrypt.compare(password,userData.password);
        if(result){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userData._id,
              }, secret);
              
            res.status(200).json({
                status:"Success",
                message:token
            })
        }else{
            res.status(401).json({
                status:"Failed",
                message:"Password does not match"
            })
        }
    }else{
        res.status(401).json({
            status:"Failed",
            message:"Email id doesnot match"
        })
    }
});

router.get("/",async(req,res)=>{
    res.status(200).send("Welcome to login page");
})


module.exports = router;