const userRouter=require("express").Router();
const usercontroller =require('../controller/userController');
const endPoint = require("../controller/userEndPoint");
const {authMiddleware} = require("../middleware/auth");
const errorValidation  = require("../middleware/errorValidation");
const {signUpValidate,updateUserValidate}=require('../validation/userValidationSchema')
const {multerFun,validateFiletype}= require('../service/multer')

userRouter.post('/signUp', signUpValidate ,errorValidation   ,usercontroller.signUp)
userRouter.get('/signIn',usercontroller.signIn)
userRouter.patch('/updateUser/:id',authMiddleware(endPoint.updateUser),updateUserValidate,errorValidation,usercontroller.updateUser)
userRouter.get('/getusers',authMiddleware(endPoint.getusers),usercontroller.getAllUsers)
userRouter.delete('/deleteuser/:id',authMiddleware(endPoint.deleteUser),usercontroller.deleteUser)
userRouter.get('/user/getAllMessages',authMiddleware(endPoint.getMessages),usercontroller.getMessages)
userRouter.patch('/user/profilePic',authMiddleware(endPoint.updateUser),multerFun('user/profilePic',validateFiletype.image).single("image"),usercontroller.updateProfilePic)
userRouter.patch('/user/coverPic',authMiddleware(endPoint.updateUser),multerFun('user/coverPic',validateFiletype.image).array("images",5),usercontroller.updateCoverPic)
userRouter.patch('/user/filetext',authMiddleware(endPoint.updateUser),multerFun('user/filetext',validateFiletype.fileText).single("file"),usercontroller.uploadFilesText)
module.exports=userRouter
