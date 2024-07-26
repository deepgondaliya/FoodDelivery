const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#"

router.post("/creatuser", [
    body('email','incorrect email').isEmail(),
    body('name','incorrect name').isLength({ min: 3 }),
    body('password','incorrect password').isLength({ min: 5 })]
    , async(req,res)=>{

        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser" ,[
    body('email','incorrect email').isEmail(),
    body('password','incorrect password').isLength({ min: 5 })], async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let email = req.body.email;
    try {
        let userData =  await User.findOne({email});
        if(!userData){
            res.status(400).json({ errors: "Try Loggin with correct Email" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare){
            res.status(400).json({ errors: "Try Loggin with correct password" });
        }

        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)


        res.json({success:true, authToken: authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;