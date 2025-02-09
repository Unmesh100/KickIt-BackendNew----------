const express=require('express')

const mongoose=require('mongoose')
const { isTime } = require('validator')

const DB=process.env.DATABASE_LOCAL

const Schema=new mongoose.Schema({
    
    activity:String,
      venue:String,
      date:Date,
      time:String,
      playersRequired:Number,
      admin:String


})

Schema.pre('save',async function(next){
    if(this.isModified('playersRequired') && !this.isModified('activity')){
      this.remove()
    }
})

const model=new mongoose.model('Events',Schema)

module.exports=model