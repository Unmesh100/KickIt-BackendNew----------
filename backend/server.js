const express=require('express')

const app=require('./app')


const mongoose=require('mongoose')

const {Server}=require('socket.io')

const http=require('http')

const server=http.createServer(app)


const io = new Server(server, {
    cors: {
      origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:5173/CreateEvent', 'http://127.0.0.1:8000'],
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ["websocket", "polling"]
  });
const DB=process.env.DATABASE

const model=require('./models/eventmodels')

const ApiFeature=require('./utils/ApiFeature')

io.on('connection',socket=>{
    //console.log('connected to the client')
    socket.on('hi',(token)=>{
        let x=0
        if(token!='' && x==0){
        console.log(token)
        x++
        }
    })
    
   
})

process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION')
    console.log(err.name,err.message)
    process.exit(1)
})


mongoose.connect(DB,{
    useNewUrlParser:true,
    useFindAndModify:false
    
   
   
}).then((con)=>{
   
    console.log('Database is connected')
})

server.listen(8000,()=>{
    
    console.log('listening')
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    server.close(()=>{
        process.exit(1)
    })
})
