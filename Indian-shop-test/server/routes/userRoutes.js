const express = require("express");

const userRouter = express.Router();

userRouter.post("/signin",(req,res)=>{
    console.log("received sign in request");
    res.status(200).json({status:"success"});
    res.end();
})
module.exports = userRouter;
