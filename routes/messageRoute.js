
const errorValidation = require('../middleware/errorValidation')
const messagecontroller=require('../controller/messageController')
const { addMessageValidate } = require('../validation/messageValidationSchema')


const messageRouter=require('express').Router()

messageRouter.post('/message/:id',addMessageValidate,errorValidation,messagecontroller.addMessage)

module.exports=messageRouter