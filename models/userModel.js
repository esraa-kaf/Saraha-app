const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required: true,
},
email:{
    type:String,
    required:true,
    unique:true
},
Password:{
    type:String,
    required:true 
},
phone:{
    type:Number
},
isEmailConfirmed:{
    type:Boolean,
    default:false

},
profilePic:{
    type:String
},
coverPic:{
    type:Array
},
uploadYourFile:{
    type:String

},
role:{
    type:String,
    default:'user',
    
},
lastSeen:{
    type:String
}
},{
    timestamps:true
});

const User=mongoose.model("users",userSchema)
module.exports=User