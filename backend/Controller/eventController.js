const express = require('express')
const path = require('path')
const EventEmitter = require('node:events')
const ejs = require('ejs')
const jwt = require('jsonwebtoken')
const eventEmitter = new EventEmitter();
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')


const eventModel = require('../models/eventmodels')
const userModel = require('../models/usermodels')
const tourModel = require('../models/tournamentmodels')

const ApiFeature = require('../utils/ApiFeature')

exports.getAllEvents = catchAsync(async (req, res, next) => {

   let data

   let id
   if (req.cookies.token === undefined) {
      id = 'default'
   }
   else {
      const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
      id = decode.id
   }
   console.log(req.query)
   const event = new ApiFeature(eventModel, req.query).filter()

   data = await event.query


   let user

   if (id === 'default') {
      user = {
         _id: 'default'
      }
   }
   else
      user = await userModel.findById(id)

   if (data.length == 0) {
      next(new AppError('The data is non existant', 404))
   }
   else {


      return res.status(200).json({
         data
      })
   }



})

exports.getCreateEvent = catchAsync(async (req, res, next) => {

   const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

   const id = decode.id

   const user = await userModel.findById(id)

   if (!user) {

      return next(new AppError('Not found by this Id', 404))
   }
   const html = await ejs.renderFile(path.resolve('./public/views/CreateEvents.ejs'))

   return res.status(200).send(html)
})

exports.getEventDetails = catchAsync(async (req, res, next) => {



})

exports.postTournament = catchAsync(async (req, res, next) => {
   console.log(req.body);
   console.log(req.cookies.token)
   const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

   const id = decode.id

   const user = await userModel.findById(id)
   console.log(user)
   if (!user) {

      return next(new AppError('Not found by this Id', 404))
   }
   const body = req.body

   const data = {
      "activity": (req.body.activity),
      "venue": req.body.venue,
      "data": req.body.data,
      "time": req.body.time
   }

   await tourModel.create(data)

   return res.status(200).json({
      status: "success"
   })
})

exports.chatApp = (catchAsync(async (req, res, next) => {

   const id = req.cookies.token

   const decode = jwt.verify(id, process.env.JWT_SECRET)

   return res.status(200).json({
      token: decode.id
   })


}))

exports.createEvent = catchAsync(async (req, res, next) => {
   console.log(req.body);
   console.log(req.cookies.token)
   const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

   const id = decode.id

   const user = await userModel.findById(id)
   console.log(user)
   if (!user) {

      return next(new AppError('Not found by this Id', 404))
   }
   const body = req.body

   req.body.admin=decode.id

   const data = {
      "activity": (req.body.activity),
      "venue": req.body.venue,
      "data": req.body.data,
      "time": req.body.time
      
      
   }

   await eventModel.create(req.body)

   return res.status(200).json({
      status: "success"
   })

})
exports.getAllTournaments = async (req, res, next) => {

   console.log('hello')

   const tournaments = await tourModel.find()
   console.log(tournaments);
   res.setHeader('Content-Type', 'application/json')
   res.send({
      data: {
         tour: tournaments
      }
   })

}

exports.updateTotalPlayers = catchAsync(async (req, res, next) => {
  
   const token=req.cookies.token
   const decode=jwt.verify(token,process.env.JWT_SECRET)
  
   const event=await eventModel.find({admin:decode.id})

   
   console.log(event) 

   const newUser=await eventModel.findByIdAndUpdate(event._id,{ $inc: {matchesPlayed:0.5}})
 
   return res.status(200).json({
     status:"success",
     newUser
   })


})