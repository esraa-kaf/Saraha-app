const { required } = require('joi');
const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
title:{
    type:String,
    required: true
},
desc:{
    type:String,
    required: true
},
userId:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
}


},{
    timestamps:true
});

const Blog=mongoose.model("blog",blogSchema)
module.exports=Blog