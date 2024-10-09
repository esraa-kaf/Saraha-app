const blogsRouter=require('express').Router()
const blogcontroller=require('../controller/blogController')
const {authMiddleware} = require('../middleware/auth')
const errorvalidation = require('../middleware/errorValidation')
const { addBlogValidate } = require('../validation/blogValidationSchema')


blogsRouter.post('/addBlog',addBlogValidate,errorvalidation,authMiddleware,blogcontroller.addBlog)

module.exports=blogsRouter