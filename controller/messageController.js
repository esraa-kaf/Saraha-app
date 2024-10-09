const Message = require("../models/messagesModel")
const User = require("../models/userModel")

exports.addMessage = async(req,res)=>{
const {id}=req.params
const {messageBody}=req.body
try{
    const user=await User.findById(id)
    if(user){
        const addNewMessage= await Message.insertMany({messageBody , recieverId:id})
        // console.log(addNewMessage); 
        res.status(200).json({          
            status_code:200,
            data:addNewMessage,
            message:"message added succsessfully "
        })     
    }
    else{
        res.status(404).json({          
            status_code:404,
            message:"user not found in database"
        })
    }
}catch{
    res.status(500).json({          
        status_code:500,  
        message:"no messages have added"
    })
}



}