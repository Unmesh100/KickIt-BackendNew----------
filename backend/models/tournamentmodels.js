const express=require('express')

const mongoose=require('mongoose')
const { isTime } = require('validator')

const DB=process.env.DATABASE_LOCAL

const Schema=new mongoose.Schema({
    
    activity:String,
    venue:String,
    date:Date,
    time:String


})

const model=new mongoose.model('Tournament',Schema)

module.exports=model