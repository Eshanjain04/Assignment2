const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const user = require("../model/user");
const post = require("../model/post");

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.post("/",body("title").isAlphanumeric(), body("body").isAlphanumeric(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.user = req.user;
    try{
        await post.create(req.body);
        res.status(200).json({
            status:"Post Created",
            data:req.body
        })
    }catch(e){
        res.status(401).json({
            status:"Failed",
            message : e.message
        })
    }
    
})

router.get("/",async (req,res)=>{
    const data = await post.find({user:req.user});
    res.status(200).json({
        posts:data
    })
});

router.put("/:id",async(req,res)=>{
    try{
        await post.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            status:"Success",
            message:"Post updated"
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
    
});

router.delete("/:id",async(req,res)=>{
    try{
        await post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:"Success",
            message:"Successfully Deleted"
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports = router;