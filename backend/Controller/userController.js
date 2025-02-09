const express=require('express')
const path=require('path')
const EventEmitter=require('node:events')
const ejs=require('ejs')
const eventEmitter = new EventEmitter();
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
const jwt=require('jsonwebtoken')


const eventModel=require('../models/eventmodels')
const userModel=require('../models/usermodels')
const ApiFeature=require('../utils/ApiFeature');
const { Console } = require('node:console');

exports.getProfile=catchAsync(async(req,res,next)=>{
    
    const token=req.cookies.token
    const decode=jwt.verify(token,process.env.JWT_SECRET)
   
    const user=await userModel.findById(decode.id)
    
    console.log(user)
   
    
    return res.status(200).json({
      user:user
    })
})
let y;
exports.getUpdateProfile=catchAsync(async(req,res,next)=>{
    const id=req.params.id
    const user=await userModel.findById(id)

    console.log('Test case  1 passed');

    y=id
    const file=await ejs.renderFile(path.resolve('./public/views/updateProfile.ejs'),{data:user})

    console.log(user)
    
    return res.status(200).send(file)
})


exports.updateProfile=catchAsync(async (req,res,next)=>{

  console.log('UpdateProfile')

 const token=req.cookies.token
 console.log(req.body)
 const decode=jwt.verify(token,process.env.JWT_SECRET)
 console.log(decode)
 console.log(decode.id)
    const user=await userModel.findByIdAndUpdate(decode.id,req.body)
   console.log(user)
    return res.status(200).json({
      status:"success"
    })
 
})

exports.updateProfilePicture=catchAsync(async(req,res,next)=>{
   
//if(req.file==undefined)return  res.redirect(`http://127.0.0.1:8000/KickIt/profile/${y}`)
   console.log("hello")
const id=req.cookies.token

const decode=jwt.verify(id,process.env.JWT_SECRET)
console.log(req.file===undefined)
if(req.file===undefined){
  return res.status(200).json({
    status:"success"
  })
}
const newUser=await userModel.findByIdAndUpdate(decode.id,{image:`${req.file.filename}`})

console.log(newUser)
 
  return res.status(200).json({
    newUser:newUser,
    status:"success"
  })
    

})

exports.updateMatches=catchAsync(async(req,res,next)=>{
 
  const token=req.cookies.token
  const decode=jwt.verify(token,process.env.JWT_SECRET)

  const newUser=await userModel.findByIdAndUpdate(decode.id,{ $inc: {matchesPlayed:0.5}})

  return res.status(200).json({
    status:"success",
    newUser
  })
})

exports.makeChanges=catchAsync(async(req,res,next)=>{
   req.id=y
   
    next()
})