const express=require('express')
const path=require('path')
const EventEmitter=require('node:events')
const ejs=require('ejs')
const jwt=require('jsonwebtoken')
const eventEmitter = new EventEmitter();
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')


const eventModel=require('../models/eventmodels')
const userModel=require('../models/usermodels')
const ApiFeature=require('../utils/ApiFeature')

exports.getAllEvents=catchAsync(async (req,res,next)=>{

   let data
   
   let id
   if(req.cookies.token===undefined){
      id='default'
   }
   else{
    const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
     id=decode.id
    }
   console.log(req.query)
const event=new ApiFeature(eventModel,req.query).filter()
  
data=await event.query

   
   let user
    
    if(id==='default'){
      user={
         _id:'default'
      }
    }
    else
    user=await userModel.findById(id)

   if(data.length==0){
     next(new AppError('The data is non existant',404))
   }
   else{
   
   
  return res.status(200).json({
   data
  })
   }

  
  
})

exports.getCreateEvent=catchAsync(async(req,res,next)=>{
   
   const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   
   const id=decode.id

   const user=await userModel.findById(id)
   
   if(!user){
      
      return next(new AppError('Not found by this Id',404))
     }
   const html=await ejs.renderFile(path.resolve('./public/views/CreateEvents.ejs'))
  
   return res.status(200).send(html)
})

exports.chatApp=(catchAsync(async(req,res,next)=>{

   const id=req.cookies.token
   
   const decode=jwt.verify(id,process.env.JWT_SECRET)

   return res.status(200).json({
      token:decode.id
   })


}))

exports.createEvent=catchAsync(async(req,res,next)=>{
   console.log(req.body);
   console.log(req.cookies.token)
   const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   
   const id=decode.id

   const user=await userModel.findById(id)
   console.log(user)
   if(!user){
      
      return next(new AppError('Not found by this Id',404))
     }
   const body=req.body
   
   const data={
      "activity":(req.body.activity),
      "venue":req.body.venue,
      "data":req.body.data,
      "time":req.body.time
   }
  
  await eventModel.create(data)
  
 return res.status(200).json({
   status:"success"
 })
   
})