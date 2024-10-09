const { access } = require("../middleware/auth");
const User = require("../models/userModel");
const { updateUser, deleteUser, getMessages } = require("./userController");

const endPoint ={
    updateUser:[access.admin , access.user],
    deleteUser:[access.admin],
    getusers:[access.admin],
    getMessages:[access.user]
}
module.exports=endPoint;