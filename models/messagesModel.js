
const mongoose=require('mongoose')
const messageSchema= new mongoose.Schema({
recieverId:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
},
messageBody:{
    required:true,
    type:String
}
},{
    timestamps:true
}
)
const Message= mongoose.model('Message',messageSchema)
module.exports=Message;