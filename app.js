
const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const path =require('path')
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(express.json({limit: '25mb'}));
app.use(bodyParser.text({ limit: '5mb' }));
const userRouter =require('./routes/userRoute')
const blogsRouter =require('./routes/blogRoute')
 const messageRouter =require('./routes/messageRoute')
app.use(userRouter)
app.use(blogsRouter)
app.use(messageRouter)
// const createConnection =require('./DB/connection')
// createConnection;



const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://mohamed1:12345@esraakaf.vu1anyf.mongodb.net/training')
.then(()=>{

    const PORT =process.env.PORT ||3000;
    app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
    
  });
},
(error)=>{
  
  console.log(`DB connection error ${error.message}`)

})

