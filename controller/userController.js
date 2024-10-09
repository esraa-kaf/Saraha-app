const express=require('express')
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Message=require('../models/messagesModel')
const User=require('../models/userModel')
const saltRound=7 ;

exports.signUp=async(req,res)=>{
    try{
        const{name,email,Password,cPassword,phone,role,profilePic,coverPic,lastSeen}=req.body
        console.log(Password,cPassword);     
        if(Password==cPassword){
        // console.log(Password,cPassword);
        // plaintextpassword==password 
        // salt == عدد المرات
        bcrypt.hash(Password, saltRound, async(err, hash)=>{
            const createUser=new User({name,email, Password:hash,phone,role,profilePic,coverPic,lastSeen})
            console.log(createUser);
            await createUser.save();
            res.status(200).json({          
                status_code:200,
                data:createUser,
                message:"user register succsessfully "
            })
        });
       
        }
        else{
            res.json({Message:"password not match cPassword"})
           
           }
    }
    catch{(error)=>{res.status(500).json({          
        status_code:500,
        data:null,
        message:error.message
    })
}}}
///////////////////////////////////////////////////////////////////////
exports.signIn=async(req,res)=>{
    const {email,Password}=req.body
    const foundUser=await User.findOne({email})
    console.log(foundUser);
    if(foundUser){
        bcrypt.compare(Password,foundUser.Password, function(err, result) {
            if(result){
                var token = jwt.sign({id:foundUser.id ,email:foundUser.email },process.env.secretKey)
                res.status(200).json({
                    status_code:200,
                    data:{result,token},
                    message:"password is valid"
                })
            }else{
                res.status(500).json({
                    status_code:500,
                    message:"password is not valid"
                })
            }
          
        });
       
    }
    else{
        res.status(404).json({
            status_code:404,
            data:null,
            message:"invalid email "
        })
    }
    
}
///////////////////////////////////////////////////////////////////////

exports.updateUser=async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    const findUser=await User.findByIdAndUpdate({_id:id},{name},{new:true});
    res.status(200).json({
        status_code:200,
        data:findUser,
        message:"update"
    })
    // res.json({message:"update",findUser})
}
//////////////////////////////////////////////////////////////////////////

exports.getAllUsers=async(req,res)=>{
    const allUsers=await User.find({}).select("_password")
    res.status(200).json({
        status_code:200,
        data:allUsers,
        message:"Done"
    })
}

/////////////////////////////////////////////////////////////////////

exports.deleteUser=async(req,res)=>{
    const {id}=req.params
 const deleteuser=await User.findByIdAndDelete(id)
 res.status(200).json({
    status_code:200,
    data:deleteuser,
    message:"deleted"
})
}

///////////////////////////////////////////////////////////
exports.getMessages=async(req,res)=>{
let {_id}=req.user
const messages=await Message.find({recieverId:_id})
res.status(200).json({
    status_code: 200,
     data: messages,
    message: "Done",
  })

}
///////////////////////////////////////////////////
exports.updateProfilePic=async(req,res)=>{
console.log(req.file);
if(req.fileUploadError){
    res.status(402).json({
        status_code: 402,
        
        message: "invalid file"
      })
}else{
    let fileName =`${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
    console.log(req.file);
    const updateUser =await User.findByIdAndUpdate(req.user.id ,{ profilePic:fileName},{new:true})
    res.status(200).json({
        status_code: 200,
        data:updateUser,
        message: "Done"
      })
}


}

///////////////////////////////////////////////////////
exports.updateCoverPic=async(req,res)=>{
console.log(req.files);

    if(req.fileUploadError){
        res.status(402).json({
            status_code: 402,          
            message: "invalid file"
          })
    }else{
        let imageUrl=[]
        console.log(req.files);
        for (let i = 0; i < req.files.length; i++) {
        imageUrl.push (`${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.files[i].filename}`)          
        }
        
        console.log(imageUrl);
        const updateUser =await User.findByIdAndUpdate(req.user.id ,{ coverPic:imageUrl},{new:true})
        res.status(200).json({
            status_code: 200,
            data:updateUser,
            message: "Done"
          })
    }
}

exports.uploadFilesText=async(req,res)=>{
    console.log(req.file);
   if(req.fileUploadError){
    res.status(402).json({
        status_code: 402,
        
        message: "invalid file"
      })
}else{
    let fileName =`${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
    console.log(req.file);
    const updateUser =await User.findByIdAndUpdate(req.user.id ,{filetext:fileName},{new:true})
    res.status(200).json({
        status_code: 200,
        data:updateUser,
        message: "Done"
      })
}
  
} 

