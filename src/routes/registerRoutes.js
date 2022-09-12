const express = require("express");
const app = require("../app");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../model/user");
const { body, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.get("/",(req,res)=>{
    res.json({messgae:"Welcome to register Page"})
});

router.post("/",body("name").isAlpha(), body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        var password = req.body.password;
        password = await bcrypt.hash(password,10);
        req.body.password = password;
        await user.create(req.body);
        res.json({
            status:"Success",
            data:req.body
        })
    }catch(e){
        res.json({
            status:"failure",
            messgae:e.message
        })
    }
   
})


module.exports = router;