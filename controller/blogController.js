const Blog = require('../models/blogModel');
const User = require('../models/userModel');


exports.addBlog = async(req,res)=>{
const {title,desc} = req.body
console.log(req.user);

const addBlog= await Blog.insertMany({title , desc , userId:req.user._id})
console.log(addBlog);

res.status(200).json({          
    status_code:200,
    data:addBlog,
    message:"blog added succsessfully "
})
}